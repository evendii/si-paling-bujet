const {
    WAConnection: _WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const simple = require('./lib/simple')
let WAConnection = simple.WAConnection(_WAConnection)
let Hotcode = new WAConnection()
const fs = require('fs')
const { banner, start, success } = require('./lib/functions')
const { color, bgcolor } = require('./lib/color')
const welcome = require('./message/group')
const chalk = require('chalk');
const colors = require('colors');
const spin = require('spinnies');
const async = require('async');
const CFonts = require('cfonts');
const os = require('os');

require('./ValkyrieX4.js')
nocache('./ValkyrieX4.js', module => console.log(`${module} is now updated!`))

const starts = async (Valkyrie = new WAConnection()) => {
    Valkyrie.logger.level = 'warn'
    Valkyrie.version = [2, 2143, 3]
    Valkyrie.browserDescription = [ 'KirBotz', 'Chrome', '3.0' ]
    
    Valkyrie.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan bang'))
    })

    fs.existsSync('./session.json') && Valkyrie.loadAuthInfo('./session.json')
    Valkyrie.on('connecting', () => {
        start('2', 'Connecting...')
    })
    Valkyrie.on('open', () => {
        success('2', 'Connected')
        setTimeout( () => {
        	console.log(bgcolor(`🌹Welcome To Valkyrie·Team`, 'red'))
            console.log(bgcolor(`🌹Script Ini Di Susun Bersama-sama`, 'yellow'))
            console.log(bgcolor(`🌹Akira, Ozaan, Kahfz, Aril, Pebri`, 'green'))
	    	console.log(bgcolor(`🌹Created By Valkyrie·Team`, 'blue'))
	    	}, 1000)    		    	     	
    })
    await Valkyrie.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(Valkyrie.base64EncodedAuthInfo(), null, '\t'))
        
Valkyrie.on('group-participants-update', async (anu) => {
		await welcome(Valkyrie, anu)
	})
    Valkyrie.on('chat-update', async (message) => {
        require('./ValkyrieX4.js')(Valkyrie, message)
    })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
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

starts()
