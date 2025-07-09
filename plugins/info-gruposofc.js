import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  const namegrupo = 'Grupo Oficial'
  const gp1 = 'https://chat.whatsapp.com/KoJjHo6o3Ew7P5qkjaIh0r' // ← tu link real

  const namechannel = 'Canal de la Bot'
  const channel = 'https://whatsapp.com/channel/0029VbAZcyIIXnlwp79iwu2l' // ← tu canal real

  const dev = '💎 Creador: Félix Manuel'
  const catalogo = 'https://qu.ax/pJCKB.jpg' // o './media/grupos.jpg'
  const emojis = '👨‍💻'

  let grupos = `
╭─⟪ *💎GRUPOS OFICIALES * 
│
│ 🩵 *${namegrupo}*
│ ${gp1}
│
│ 🩵 *${namechannel}*
│ ${channel}
╰─────────────────╯
`

  await conn.sendFile(m.chat, catalogo, 'grupos.jpg', grupos.trim(), m)
  await m.react(emojis)
}

handler.help = ['grupos']
handler.tags = ['info']
handler.command = ['grupos', 'links', 'groups']

export default handler
