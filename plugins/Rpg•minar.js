let cooldowns = {}

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  let cookies = `${pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300])}` * 1
  let emerald = `${pickRandom([1, 5, 7, 8])}` * 1
  let iron = `${pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80])}` * 1
  let gold = `${pickRandom([20, 5, 7, 8, 88, 40, 50])}` * 1
  let coal = `${pickRandom([20, 5, 7, 8, 88, 40, 50, 80, 70, 60, 100, 120, 600, 700, 64])}` * 1
  let stone = `${pickRandom([200, 500, 700, 800, 900, 4000, 300])}` * 1

  let time = global.db.data.users[m.sender].lastmiming + 600000
  if (new Date - global.db.data.users[m.sender].lastmiming < 600000) return conn.reply(m.chat, `*🕑 Debes esperar ${msToTime(time - new Date())} para volver a minar*`, m)

  let hasil = Math.floor(Math.random() * 1000)
  let info = `⛏️ ESTABAS MINANDO...

> 💎 OBTUVISTE ESTOS RECURSOS:

✨ *Exp*: ${hasil}
💰 *coins*: ${cookies}
💎 *Diamantes*: ${emerald}
🔩 *Hierro*: ${iron}
🏅 *Oro*: ${gold}
🕋 *Carbón*: ${coal}
🪨 *Piedra*: ${stone}`

  // ENVÍO DEL MENSAJE COMO REENVIADO DESDE CANAL/NEWSLETTER
  const channelRD = { 
    id: "120363400360651198@newsletter", // <-- Pon aquí el ID de tu canal/newsletter
    name: "💎 Frases y más 💎"              // <-- Pon aquí el nombre del canal/newsletter
  }

  await conn.sendMessage(m.chat, {
    text: info,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.name,
        serverMessageId: -1,
      },
      externalAdReply: {
        title: channelRD.name,
        body: '𝐌500 𝐔𝐋𝐓𝐑𝐀 𝐁𝐎𝐓',
        thumbnailUrl: 'https://files.catbox.moe/szodpq.jpg', // Cambia la imagen si deseas
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
      }
    }
  }, { quoted: m })

  await m.react('⛏️')

  user.health -= 50
  user.pickaxedurability -= 30
  user.cookies += cookies
  user.iron += iron
  user.gold += gold
  user.emerald += emerald
  user.coal += coal
  user.stone += stone
  user.lastmiming = new Date * 1
}

handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'miming', 'mine']
handler.register = true
export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
  seconds = Math.floor((duration / 1000) % 60),
  minutes = Math.floor((duration / (1000 * 60)) % 60),
  hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? '0' + hours : hours
  minutes = (minutes < 10) ? '0' + minutes : minutes
  seconds = (seconds < 10) ? '0' + seconds : seconds

  return minutes + ' m y ' + seconds + ' s '
}