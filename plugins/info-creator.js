let handler = async (m, { conn }) => {
  // Reacciona con 🔥
  if (conn.sendMessage) {
    await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key }});
  }

  // Datos de los contactos
  let numberCreator = '18293142989' // Número del creador
  let nombreCreator = '✰ 𝐏𝐫𝐨𝐩𝐢𝐞𝐭𝐚𝐫𝐢𝐨 ✰'
  let canal = 'https://wa.me/18393142989'

  let numberBot = '527222518356' // Número del bot
  let nombreBot = 'BOT OFICIAL'

  let numberYoSoyYo = '18293142989'
  let nombreYoSoyYo = '💎 C R E A D O R 💎'

  // vCards individuales
  let vcardCreator = `BEGIN:VCARD
VERSION:3.0
N:${nombreCreator}
FN:${nombreCreator}
TEL;waid=${numberCreator}:${numberCreator}
END:VCARD`

  let vcardBot = `BEGIN:VCARD
VERSION:3.0
N:${nombreBot}
FN:${nombreBot}
TEL;waid=${numberBot}:${numberBot}
END:VCARD`

  let vcardYoSoyYo = `BEGIN:VCARD
VERSION:3.0
N:${nombreYoSoyYo}
FN:${nombreYoSoyYo}
TEL;waid=${numberYoSoyYo}:${numberYoSoyYo}
END:VCARD`

  // Envía el canal como texto
  await conn.sendMessage(m.chat, { text: `🔥 Aquí está el número de mi propietario y mi creador.` }, { quoted: m })

  // Envía la tarjeta de contacto con los tres contactos
  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Contactos Importantes',
      contacts: [
        { vcard: vcardCreator },
        { vcard: vcardBot },
        { vcard: vcardYoSoyYo }
      ]
    }
  }, { quoted: m })
}

handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creatora', 'creadora', 'dueña']

export default handler