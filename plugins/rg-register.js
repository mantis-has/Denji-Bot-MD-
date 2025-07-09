import axios from 'axios'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import moment from 'moment-timezone'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, args, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    let whe = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
    let perfil = await conn.profilePictureUrl(whe, 'image').catch(_ => 'https://qu.ax/kAnbg.jpg')

    if (user.registered === true) {
        return m.reply(`《★》𝗬𝗮 𝘁𝗲 𝗲𝗻𝗰𝘂𝗲𝗻𝘁𝗿𝗮𝘀 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗱𝗼.\n\n¿𝗤𝘂𝗶𝗲𝗿𝗲 𝘃𝗼𝗹𝘃𝗲𝗿 𝗮 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗮𝗿𝘀𝗲?\n\n𝗨𝘀𝗲 𝗲𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝗽𝗮𝗿𝗮 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 𝘀𝘂 𝗿𝗲𝗴𝗶𝘀𝘁𝗿𝗼.\n*${usedPrefix}unreg*`)
    }
    
    if (!Reg.test(text)) return m.reply(`《★》Eʟ ғᴏʀᴍᴀᴛᴏ ɪɴɢʀᴇsᴀᴅᴏ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴏ\n\nUsᴏ ᴅᴇʟ ᴄᴏᴍᴀɴᴅᴏ: ${usedPrefix + command} 𝗻𝗼𝗺𝗯𝗿𝗲.𝗲𝗱𝗮𝗱\nEᴊᴇᴍᴘʟᴏ : *${usedPrefix + command} ${name2}.14*`)
    
    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply('《★》Eʟ ɴᴏʍ𝗯𝗿𝗲 ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪᴏ.')
    if (!age) return m.reply('《★》Lᴀ ᴇᴅᴀᴅ ɴᴏ ᴘᴜᴇᴅᴇ ᴇsᴛᴀʀ ᴠᴀᴄɪ́ᴀ.')
    if (name.length >= 100) return m.reply('《★》El nombre es demasiado largo.')
    
    age = parseInt(age)
    if (age > 1000) return m.reply('《★》 *ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*')
    if (age < 5) return m.reply('《★》 *ʟᴀ ᴇᴅᴀᴅ ɪɴɢʀᴇsᴀᴅᴀ ᴇs ɪɴᴄᴏʀʀᴇᴄᴛᴀ*')
    
    user.name = name.trim()
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].estrellas += 10
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5    

    let who;
    if (m.quoted && m.quoted.sender) {
        who = m.quoted.sender;
    } else {
        who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    }
    
    let sn = createHash('md5').update(m.sender).digest('hex')
    let regbot = `╭─╮︹︹⊹︹︹⊹︹︹⊹︹︹╭─╮
𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢 - 𝗗𝗘𝗡𝗝𝗜 𝗕𝗢𝗧
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▭╝
┃𝐍𝐨𝐦𝐛𝐫𝐞: ${name}
┃𝐄𝐝𝐚𝐝: ${age} años
╰━─━─━─≪≪✠≫≫─━─━─━╯

「🎁」𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀

5 *Exp*
14 *Coins*
245 *Tokens*

> Usa *#profile* para ver tu perfil.
`

  await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: '⊱『𝗡𝗨𝗘𝗩𝗢 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢』⊰',
                thumbnailUrl: 'https://qu.ax/pJCKB.jpg',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });

/*    await m.react('🩵')
  await conn.sendMessage(m.chat, {
           text: regbot, 
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,                      
                containsAutoReply: true,     
                renderLargerThumbnail": true,
                title: '⊱『✅𝆺𝅥 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢(𝗔) 𝆹𝅥✅』⊰',  
                body: dev,  
                containsAutoReply: true,
                showAdAttribution: true,
                mediaType: 1, 
                thumbnailUrl: 'https://cdnmega.vercel.app/media/J1ZzFDYC@wNBS8rKd-Ynw264guxMkO8Hx2CuTdAuyfE0ijGbS3Dw' }}}, {quoted: m})
*/

let chtxt = `👤 *𝖴𝗌uario* » ${m.pushName || 'Anónimo'}
🗂 *𝖵𝖾𝗋𝗂𝖿𝗂𝖼𝖺𝖼𝗂𝗈́𝗇* » ${user.name}
💎 *𝖤𝖽𝖺𝖽* » ${user.age} años
🩵 *𝖨𝖣 𝖽𝖾 𝗋𝖾𝗀𝗂𝗌𝗍𝗋𝗈* »
⤷ ${sn}`;

    let channelID = '120363402615935849@newsletter';
        await conn.sendMessage(channelID, {
        text: chtxt,
        contextInfo: {
            externalAdReply: {
                title: "【 🩵 𝐍𝐔𝐄𝐕𝐎 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐎 🩵 】",
                body: '𝚁𝚎𝚐𝚒𝚜𝚝𝚛𝚘𝚜 𝙼𝚊𝚔𝚒𝚖𝚊 2.0 𝙱𝚘𝚝',
                thumbnailUrl: perfil,
                sourceUrl: redes,
                mediaType: 1,
                showAdAttribution: false,
                renderLargerThumbnail: false
            }
        }
    }, { quoted: null });
};

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler
