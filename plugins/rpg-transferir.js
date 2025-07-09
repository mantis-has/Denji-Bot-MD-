//código creado x Félix Manuel
//Porfavor deja los creditos

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let user = global.db.data.users[m.sender]
  let recipient = m.mentionedJid && m.mentionedJid[0]

  if (!recipient) return conn.reply(m.chat, `💎Comando mal utilizado, usa:\n\n${usedPrefix + command} @usuario cantidad`, m)

  if (!(recipient in global.db.data.users)) return conn.reply(m.chat, 'Este usuario no se encuentra en mi base de datos.', m)

  let amount = parseInt(args[1])
  if (isNaN(amount) || amount <= 0) return conn.reply(m.chat, '🩵 Ingresa una *cantidad válida* para transferir.', m)

  if (user.monedas < amount) return conn.reply(m.chat, 'No tienes suficientes Diamantes para transferir.', m)

  global.db.data.users[m.sender].monedas -= amount
  global.db.data.users[recipient].monedas += amount

  let msg = `
╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇    「TRANSFERENCIA」 
╰━─━─━─≪≪✠≫≫──━━╯
┃
┃REMITENTE: ${nombre}
┃
┃CANTIDAD: ${amount} MakiCoins
┗━━━━━━━━━━━━━━━━━┛`.trim()

  // ENVÍA SÓLO EL MENSAJE DE TRANSFERENCIA, PERO CON CONTEXTO DE NEWSLETTER
  const channelRD = { 
    id: "120363400360651198@newsletter", // <-- ID de tu canal/newsletter
    name: "TRANSFIRIENDO MAKICOINS"              // <-- Nombre de tu canal/newsletter
  }

  await conn.sendMessage(m.chat, {
    text: msg,
    mentions: [m.sender, recipient],
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
        body: 'MAKIMA 2.0 BOT',
        thumbnailUrl: 'https://qu.ax/xxaLb.jpg', // Cambia la imagen si lo deseas
        mediaType: 1,
        renderLargerThumbnail: true,
        sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
      }
    }
  }, { quoted: m })
}

handler.help = ['transferir @usuario cantidad']
handler.tags = ['rpg']
handler.command = ['transferir', 'enviar', 'send']
handler.register = true

export default handler