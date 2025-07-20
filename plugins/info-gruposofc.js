import fetch from 'node-fetch'

let handler = async (m, { conn }) => {

  const namegrupo = 'Grupo Oficial'
  const gp1 = 'https://chat.whatsapp.com/K0DIkrutOQI6If1kdZ4l9D?mode=r_c' // ← tu link real

  const namechannel = 'Canal del Bot'
  const channel = 'https://whatsapp.com/channel/0029Vb5nxWWFHWq5CNFP5b21' // ← tu canal real

  const dev = '💎 Creador: Deymoon oficial'
  const catalogo = 'https://qu.ax/prgKB.jpg' // o './media/grupos.jpg'
  const emojis = '👨‍💻'

  let grupos = `
╭─⟪ GRUPOS OFICIALES
│
│  ${namegrupo}
│ ${gp1}
│
│  ${namechannel}
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
