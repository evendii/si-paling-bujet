"use strict";
require("dotenv").config();
 module.exports = {
    async chatUpdate(conn, chat) {
        if (!chat.hasNewMessage) return;
            var socked = require('../../index');
          var _import = require('../Connect/index.1.js');
        let msg = chat.messages.all()[0];
        let { modul } = socked;
        let { Ctx } = _import;
        try {
            if (!msg.message) return;
            if (msg.key && msg.key.remoteJid == 'status@broadcast') return;
            let serialize = _import.Ctx.serializeM;
        msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message: msg.message;
      let isPublic = true;
    if (!isPublic) {
    if (!msg.key.fromMe) return;
   };
   let { MessageType, mentionedJid, MessageOptions } = _import.Ctx._baileys;
    let m = serialize.smsg(conn, msg);
  if (m.isBaileys === true) return;
if (msg.isBaileys) return;
     var type = Object.keys(msg.message)[0]; 
        1;
       var prefixRegEx = /^[!&z?=#.+\/]/gi;
       let { scommand, addCmd, getCommandPosition, checkSCommand, getCmd } = _import.Ctx._Fs
    var body = (type === 'conversation' && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (type == 'imageMessage') && msg.message[type].caption.startsWith(prefix) ? msg.message[type].caption : (type == 'videoMessage') && msg.message[type].caption.startsWith(prefix) ? msg.message[type].caption : (type == 'extendedTextMessage') && msg.message[type].text.startsWith(prefix) ? msg.message[type].text : (type == 'listResponseMessage') && msg.message[type].singleSelectReply.selectedRowId ? msg.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && msg.message[type].selectedButtonId ? msg.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(msg.message[type].fileSha256.toString('base64')) !== null && getCmd(msg.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(msg.message[type].fileSha256.toString('base64')) : "";
  var cmd = (type === 'conversation' && msg.message.conversation) ? msg.message.conversation : (type == 'imageMessage') && msg.message.imageMessage.caption ? msg.message.imageMessage.caption : (type == 'videoMessage') && msg.message.videoMessage.caption ? msg.message.videoMessage.caption : (type == 'extendedTextMessage') && msg.message.extendedTextMessage.text ? msg.message.extendedTextMessage.text : (type == 'buttonsResponseMessage') && msg.message[type].selectedButtonId ? msg.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(msg.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(msg.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(msg.message.stickerMessage.fileSha256.toString('base64')) : "".slice(1).trim().split(/ +/).shift().toLowerCase();
     let multi = true;
        if (multi){
           var prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : '-';
                } else {
            let prefix = pref;
          };
            var groupMetadata = m.isGroup ? await conn.groupMetadata(m.chat) : '';
             var body = (type === 'conversation' && msg.message.conversation.startsWith(prefix)) ? msg.message.conversation : (type == 'imageMessage') && msg.message[type].caption.startsWith(prefix) ? msg.message[type].caption : (type == 'videoMessage') && msg.message[type].caption.startsWith(prefix) ? msg.message[type].caption : (type == 'extendedTextMessage') && msg.message[type].text.startsWith(prefix) ? msg.message[type].text : (type == 'listResponseMessage') && msg.message[type].singleSelectReply.selectedRowId ? msg.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && msg.message[type].selectedButtonId ? msg.message[type].selectedButtonId : (type == 'stickerMessage') && (getCmd(msg.message[type].fileSha256.toString('base64')) !== null && getCmd(msg.message[type].fileSha256.toString('base64')) !== undefined) ? getCmd(msg.message[type].fileSha256.toString('base64')) : "";
              var budy = (type === 'conversation') ? msg.message.conversation: (type === 'extendedTextMessage') ? msg.message.extendedTextMessage.text: '';
               var args = body.trim().split(/ +/).slice(1);
                var command = body.toLowerCase().split(' ')[0] || '';
                 var isCmd = command.startsWith(prefix);
           let _tint = socked.modul.chalk;
         const print = function (teks) {
                if (typeof teks !== 'string') teks = require('util').inspect(teks);
                teks = require('util').format(teks);
                return conn.reply(m.chat, teks, msg);
            };
            if (isCmd && m.isGroup) {
            console.log(_tint.bold.rgb(255, 178, 102)("【CMD】"), _tint.rgb(153, 255, 153)(`${command}`), _tint.rgb(204, 204, 0)("from"), _tint.rgb(153, 255, 204)(`${m.mention}`), _tint.rgb(204, 204, 0)("in"), _tint.rgb(255, 178, 102)(`${groupMetadata.subject}`));
            };
            if (isCmd && !m.isGroup) {
            console.log(_tint.bold.rgb(255, 178, 102)("【CMD】"), _tint.rgb(153, 255, 153)(`${command}`), _tint.rgb(204, 204, 0)("from"), _tint.rgb(153, 255, 204)(`${m.mention}`), _tint.rgb(204, 204, 0)("in"), _tint.rgb(255, 178, 102)("Private Chat"));
            };
               switch (command) {
                  case prefix + 'menu':
                  case prefix + 'help': {
                        m.reply("ok")
                       }
                 break;
               }
          } catch (_) {
            _ = String(_);
            if (!_.includes("c.isZero") && !_.includes("this.isZero")) {
                return
              }
            console.log(_tint.bold.rgb(255, 182, 193)('【ERROR】'), _tint.bold.rgb(119, 221, 119)(_));
          }
     }
}