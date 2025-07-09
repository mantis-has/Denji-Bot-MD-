let handler = async (m, { conn }) => {
  // Reacciona con 💎
  if (conn.sendMessage) {
    await conn.sendMessage(m.chat, { react: { text: '💎', key: m.key }});
  }

  // Datos de los contactos
  let numberCreator = '18293142989' // Número de la creadora
  let nombreCreator = '💎 C R E A D O R 💎'
  let canal = 'https://wa.me18293142989'

  let numberBot = '527222518356' // Número del bot
  let nombreBot = 'BOT OFICIAL'

  let numberYoSoyYo = '521111111111'
  let nombreYoSoyYo = 'Number'

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
  await conn.sendMessage(m.chat, { text: `💙 AQUI ESTA EL NUMERO DE MI CREADOR Y MÁS CONTACTOS` }, { quoted: m })

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