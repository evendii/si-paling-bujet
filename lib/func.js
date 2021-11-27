require("dotenv").config();
 var Config = require("../Message/Connect/index.0.js");
 var { modul } = Config

const axios = require('axios');
const cfonts = require('cfonts');
const chalk = require('chalk');
const Crypto = require('crypto');
const fs = require('fs-extra');
const FileType = require('file-type');
const fetch = require('node-fetch');
const figlet = require('figlet');
const FormData = require('form-data');
const moment = require("moment-timezone");
const path = require('path');
const request = require('request');
const spin = require('spinnies');
const util = require('util');

const { fromBuffer } = require('file-type');
const { spawn, exec } = require('child_process');
const { WAConnection: _WAConnection, MessageType, Presence, MessageOptions, Mimetype, MimetypeMap, WALocationMessage, ChatModification, WA_MESSAGE_STUB_TYPES, WA_DEFAULT_EPHEMERAL, ReconnectMode, ProxyAgent, GroupSettingChange, waChatKey, mentionedJid, processTime } = Config.modul.baileys

function nocache(module) {
    this.logger.info(`${module} updated`)
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
    })
 }
 
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
 }

module.exports = {
  nocache,
  uncache
} 

function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
  return new Promise(async (resolve, reject) => {
    try {
      let tmp = path.join(__dirname, '../tmp', + new Date + '.' + ext)
      let out = tmp + '.' + ext2
      await fs.promises.writeFile(tmp, buffer)
      spawn('ffmpeg', [
        '-y',
        '-i', tmp,
        ...args,
        out
      ])
        .on('error', reject)
        .on('close', async (code) => {
          try {
            await fs.promises.unlink(tmp)
            if (code !== 0) return reject(code)
            resolve(await fs.promises.readFile(out))
            await fs.promises.unlink(out)
          } catch (e) {
            reject(e)
          }
        })
    } catch (e) {
      reject(e)
    }
  })
}

function toAudio(buffer, ext) {
  return new Promise((resolve, reject) => {
    let tmp = path.join(__dirname, './', + new Date  + '.' + ext)
    let out = tmp + '.mp3'
    fs.writeFileSync(tmp, buffer)
    spawn('ffmpeg', [
      '-y',
      '-i',tmp,
      '-vn',
      '-ac', '2',
      '-b:a','128k',
      '-ar','44100',
      '-f', 'mp3',
      out
    ])
    .on('error', reject)
    .on('error', () => fs.unlinkSync(tmp))
    .on('close', () => {
      fs.unlinkSync(tmp)
      resolve(fs.readFileSync(out))
      if (fs.existsSync(out)) fs.unlinkSync(out)
    })
  })
}

function toPTT(buffer, ext) {
  return new Promise((resolve, reject) => {
    let tmp = path.join(__dirname, './', + new Date + '.' + ext)
    let out = tmp + '.opus'
    fs.writeFileSync(tmp, buffer)
    spawn('ffmpeg', [
      '-y',
      '-i',tmp,
      '-vn',
      '-c:a','libopus',
      '-b:a','128k',
      '-vbr','on',
      '-compression_level','10',
      out,
    ])
    .on('error', reject)
    .on('error', () => fs.unlinkSync(tmp))
    .on('close', () => {
      fs.unlinkSync(tmp)
      resolve(fs.readFileSync(out))
      if (fs.existsSync(out)) fs.unlinkSync(out)
    })
  })
}

function toVideo(buffer, ext) {
  return new Promise((resolve, reject) => {
    let tmp = path.join(__dirname, './', + new Date + '.' + ext)
    let out = tmp + '.mp4'
    fs.writeFileSync(tmp, buffer)
    spawn('ffmpeg', [
      '-y',
      '-i', tmp,
      '-c:v','libx264',
      '-c:a','aac',
      '-ab','192k',
      '-ar','44100',
      out
    ])
    .on('error', reject)
    .on('error', () => fs.unlinkSync(tmp))
    .on('close', () => {
      fs.unlinkSync(tmp)
      resolve(fs.readFileSync(out))
      if (fs.existsSync(out)) fs.unlinkSync(out)
    })
  })
}

function stickUrl(url){
  return new Promise(async(resolve,reject)=>{
    if(!url) throw new TypeError("no url detected")
      var name = Date.now() / 10000;
      var download = function (link, filename, callback) {
          request(url).pipe(fs.createWriteStream(filename)).on('close', callback);
      };
      download(url, './' + name + '.png', async function () {
        let a = './' + name + '.png'
        let b = './' + name + '.webp'
        exec(`ffmpeg -i ${a} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${b}`, async(err) => {
          if (err) reject(err)
          resolve({
            path: b
          })
        })
      })
   })
}

module.exports = {
	toAudio,
	toPTT,
	toVideo,
	ffmpeg,
	stickUrl
}

const fetchJson = (url, options) =>
    new Promise((resolve, reject) =>
        fetch(url, options)
            .then(response => response.json())
            .then(json => resolve(json))
            .catch(err => {
                console.error(err)
                reject(err)
            })
    )

const fetchText = (url, options) => {
    return new Promise((resolve, reject) => {
        return fetch(url, options)
            .then(response => response.text())
            .then(text => resolve(text))
            .catch(err => {
                console.error(err)
                reject(err)
            })
    })
}

const fetchBase64 = (url, mimetype) => {
    return new Promise((resolve, reject) => {
        console.log('Get base64 from:', url)
        return fetch(url)
            .then((res) => {
                const _mimetype = mimetype || res.headers.get('content-type')
                res.buffer()
                    .then((result) => resolve(`data:${_mimetype};base64,` + result.toString('base64')))
            })
            .catch((err) => {
                console.error(err)
                reject(err)
            })
    })
}

module.exports = {
    fetchJson,
    fetchText,
    fetchBase64,
}

const scommand = JSON.parse(fs.readFileSync('./src/json/cmd/scommand.json'))
const addCmd = (id, command) => {
const obj = { id: id, chats: command }
             scommand.push(obj)
             fs.writeFileSync('./src/json/cmd/scommand.json', JSON.stringify(scommand))
         }
const getCommandPosition = (id) => {
      let position = null
         Object.keys(scommand).forEach((i) => {
            if (scommand[i].id === id) {
               position = i
            }
        })
     if (position !== null) {
     return position
     }
  }
const getCmd = (id) => {
      position = null
         Object.keys(scommand).forEach((i) => {
            if (scommand[i].id === id) {
               position = i
            }
        })
     if (position !== null) {
     return scommand[position].chats
     }
  }
const checkSCommand = (id) => {
      let status = false
         Object.keys(scommand).forEach((i) => {
            if (scommand[i].id === id) {
              let status = true
           }
        })
     return status
  }
 
module.exports = { 
	scommand, 
	addCmd, 
	getCommandPosition, 
	checkSCommand, 
	getCmd
}

const randomBytes = (length) => {
    return Crypto.randomBytes(length)
}

const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}

const generateMessageID = () => {
    return randomBytes(10).toString('hex').toUpperCase()
}

const getGroupAdmins = (participants) => {
	admins = []
	for (let i of participants) {
		i.isAdmin ? admins.push(i.jid) : ''
	}
	return admins
}

module.exports = {
	generateMessageID,
	getGroupAdmins, 
	randomBytes, 
	getRandom
}

const wait = async (media) => new Promise(async (resolve, reject) => {
    const attachmentData = `data:image/jpeg;base64,${media.toString('base64')}`
    const response = await fetch("https://trace.moe/api/search",{method: "POST",body: JSON.stringify({ image: attachmentData }),headers: { "Content-Type": "application/json" }});
    if (!response.ok) reject(`Gambar tidak ditemukan!`);
    const result = await response.json()
    try {
    	const { is_adult, title, title_chinese, title_romaji, title_english, episode, season, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
    	let belief = () => similarity < 0.89 ? "Saya memiliki keyakinan rendah dalam hal ini : " : ""
    	let ecch = () => is_adult ? "Iya" : "Tidak"
    	resolve({video: await getBuffer(`https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`), teks: `${belief()}
~> Ecchi : *${ecch()}*
~> Judul Jepang : *${title}*
~> Ejaan Judul : *${title_romaji}*
~> Judul Inggris : *${title_english}*
~> Episode : *${episode}*
~> Season  : *${season}*`});
	} catch (e) {
		console.log(e)
		reject(`Saya tidak tau ini anime apa`)
	}
})

const h2k = (number) => {
    var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"]
    var tier = Math.log10(Math.abs(number)) / 3 | 0
    if(tier == 0) return number
    var postfix = SI_POSTFIXES[tier]
    var scale = Math.pow(10, tier * 3)
    var scaled = number / scale
    var formatted = scaled.toFixed(1) + ''
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2)
    return formatted + postfix
}

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

module.exports = {
    wait, 
	h2k,
	getBuffer
}

const isUrl = (url) => {
       return url.match(
        new RegExp(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/,
          "gi"
        )
      );
    };

const isLinkyt = (url) => {
       return url.match(
        new RegExp(
          /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/,
          "gi"
        )
      );
    };

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

module.exports = {
    isUrl, 
	isLinkyt,
	pickRandom
}

const kyun = (s) =>{
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(s / (60 * 60));
    var minutes = Math.floor(s % (60 * 60) / 60);
    var seconds = Math.floor(s % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

     let d = new Date();
     let locale = "id";
     let gmt = new Date(0).getTime() - new Date("1 January 1970").getTime();
     let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor((d * 1 + gmt) / 84600000) % 5
    ];
     let week = d.toLocaleDateString(locale, { weekday: "long" });
     let date = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
     let waktu = d.toLocaleDateString(locale, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
     let tanggal = week + " " + weton + ", " + date;

    function formatDate(n, locale = 'id') {
      let d = new Date(n)
      return d.toLocaleDateString(locale, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric' 
      })
    }

     const time = moment().tz("Asia/Jakarta").format("HH:mm:ss");
     const WIB = moment().tz("Asia/Jakarta").format("HH:mm:ss");
     const WIT = moment().tz("Asia/Jayapura").format("HH:mm:ss");
     const WITA = moment().tz("Asia/Makassar").format("HH:mm:ss");

module.exports = {
    kyun,
    time,
    WIB,
    WITA,
    WIT,
    weton,
    week,
    date,
    waktu,
    tanggal,
    formatDate
}