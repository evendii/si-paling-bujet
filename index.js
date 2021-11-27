"use strict";
require("dotenv").config();
    const mongoose = require("mongodb");
     const qrcode = require("qrcode-terminal");
      const fs = require("fs-extra-plus");
       const chalk = require("chalk");
        const color = require("color");
         const config = require("./Message/Connect/index.0.js");
         
    const { JsonDB } = require ("node-json-db");
     const { Config } = require ('node-json-db/dist/lib/JsonDBConfig');
      const { modul } = config;
       const { WAConnection: _WAConnection, ReconnectMode } = config.modul.baileys;
        
    global.db = new JsonDB(new Config("./src/json/user/database", true, false, '/'));
     global.WAConnection = require('./lib/serialize').WAConnection(_WAConnection);
      global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '');
       global.Color = color('#FFD06C').alpha(0.5).lighten(0.5); 
        global.conn = new WAConnection();

exports.modul = modul;
async function start(sesion) {
    conn.logger.level = "warn";
    console.log(Color.cmyk().round().array());

    conn.on('qr', qr => {
        qrcode.generate(qr, { small: true });
        console.log(chalk.bold.rgb(236, 100, 75)('【INFO】'), chalk.rgb(189, 236, 182)('Silahkan Scan Qr Diatas\nKadaluarsa Dalam 30 Detik'));
    });
    fs.existsSync(sesion) && conn.loadAuthInfo(sesion);

    conn.on('connecting', () => {
        console.log(chalk.bold.rgb(236, 100, 75)('【INFO】'), chalk.rgb(189, 236, 182)('Menyambung'));
    });

    conn.on('open', (json) => {
        console.log(chalk.bold.rgb(69, 155, 167)('【WARN】'), chalk.rgb(189, 236, 182)('Tersambung'));
    });
    await conn.connect({ timeoutMs: 30 * 1000 });
    fs.writeFileSync(sesion, JSON.stringify(conn.base64EncodedAuthInfo(), null, '\t'));
    
        conn.on('chat-update', async (chat) => {
        var handler = require("./Message/Command/handler");
            handler.chatUpdate(conn, chat);
        });
        
        conn.on ('CB:action,,battery', json => {
            var batteryLevelStr = json[2][0][1].value;
            var batterylevel = parseInt (batteryLevelStr);
            var isBattre = batterylevel + "%";
            var isCharge = json[2][0][1].live;
            console.log(chalk.keyword('orange')('     Battery : ' + isBattre + ''), chalk.keyword('salmon')(', Charge :' + isCharge + ''));
        });
      };
    start('./src/json/session/qrcode-terminal.json');
 try {
       } catch (_) { 
         reject(_);
         console.log(chalk.bold.rgb(255, 182, 193)('【ERROR】'), chalk.bold.rgb(119, 221, 119)(_));
       }
            
            