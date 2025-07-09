import {watchFile, unwatchFile} from 'fs';
import chalk from 'chalk';
import {fileURLToPath} from 'url';
import fs from 'fs'; 
import cheerio from 'cheerio';
import fetch from 'node-fetch';
import axios from 'axios';
import moment from 'moment-timezone';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

//BETA: Si quiere evitar escribir el número que será bot en la consola, agregué desde aquí entonces:
//Sólo aplica para opción 2 (ser bot con código de texto de 8 digitos)
global.botNumber = '' //Ejemplo: 525218138672

//*──ׄ✰─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner = [
  ['18293142989', '🩵 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🩵', true],
  ['527222518356', 'felix', true],
  ['527222518356', 'Félix México', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.owner_lid = [
  ['149963665342644', '🩵 𝗖𝗿𝗲𝗮𝗱𝗼𝗿 🩵 (LID)', true],
  ['149963665342644', 'Félix (LID)', true]
]

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.mods = []
global.suittag = ['5215211111111'] 
global.prems = []

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.libreria = 'Baileys'
global.baileys = 'V 6.7.8'
global.vs = '2.0.0'
global.languaje = 'Español'
global.nameqr = 'M500-ULTRA-BOT'
global.sessions = 'Session'
global.jadi = 'JadiBot'
global.makiJadibts = true

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.packsticker = `─✰─ׄ─ׅ─ׄ─✰─ׄ─✰─ׄ✰─ׄ\nBot: M500 ULTRA\n\nCreador: Felix Manuel\n\nTipo: Público\n\nUsuarios: 10927\n─✰─ׄ─ׅ─ׄ─✰─ׄ─✰─ׄ✰─ׄ\n\n`
global.packname = `⏤͟͞ू⃪  ̸̷͢𝐃𝐞𝐧𝐣𝐢 𝐁𝐨𝐭𑁯ᰍ`
global.author = `𝐒𝐭𝐢𝐜𝐤𝐞𝐫𝐬 𝐁𝐲 𝐅𝐞́𝐥𝐢𝐱`;
global.wm = '⏤͟͞ू⃪  ̸̷͢𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 Félix Manuel';
global.titulowm = '⏤͟͞ू⃪𝐃𝐞𝐧𝐣𝐢 𝐁𖹭t͟ 𝐁𝐨𝐭𑁯ᰍ';
global.igfg = '𓆩‌۫᷼ ִֶָღܾ݉͢ғ꯭ᴇ꯭፝ℓɪ꯭ͨא𓆪'
global.botname = '𝐃𝐞𝐧𝐣𝐢 𝐁𝐨𝐭 𝐌𝐃'
global.dev = '© ⍴᥆ᥕᥱrᥱძ ᑲᥡ Félix Manuel'
global.textbot = '𝐃𝐞𝐧𝐣𝐢 : Félix Manuel'
global.gt = '͟͞𝐃𝐞𝐧𝐣𝐢';
global.namechannel = '𝐃𝐞𝐧𝐣𝐢 𝐂𝐡a͟𝐧n͟e͟𝐥𑁯'

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.moneda = 'M500Coins'

//• ↳ ◜𝑳𝑰𝑵𝑲𝑺  𝑫𝑬𝒀𝑴𝑶𝑶𝑵 𝑪𝑳𝑼𝑩◞ • 🩵
global.gp4 = 'https://chat.whatsapp.com/KoJjHo6o3Ew7P5qkjaIh0r' //Grupo Oficial De Makima 
global.gp1 = 'https://chat.whatsapp.com/KoJjHo6o3Ew7P5qkjaIh0r' //Grupo 2
global.gp2 = 'https://chat.whatsapp.com/KoJjHo6o3Ew7P5qkjaIh0r'//
global.channel = 'https://whatsapp.com/channel/0029VbAZcyIIXnlwp79iwu2l' //Canal Oficial
global.channel2 = 'https://whatsapp.com/channel/0029VbAa5sNCsU9Hlzsn651S' //Canal test 
global.yt = 'https://www.youtube.com/frasesbebord' //Canal De Youtube
global.md = 'https://github.com/mantis-has/Makima' //Github Oficial
global.correo = 'mantisbotmd@gmail.com'
global.cn ='https://whatsapp.com/channel/0029VbAZcyIIXnlwp79iwu2l';

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./src/catalogo.jpg');
global.estilo = { key: {  fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "5219992095479-1625305606@g.us" } : {}) }, message: { orderMessage: { itemCount : -999999, status: 1, surface : 1, message: packname, orderTitle: 'Bang', thumbnail: catalogo, sellerJid: '0@s.whatsapp.net'}}}
global.ch = {
ch1: '120363402362088282@newsletter',
}
global.multiplier = 70

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment   

//*─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─✰─ׄ─ׅ─ׄ─*

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
