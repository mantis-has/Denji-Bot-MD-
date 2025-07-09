import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const channelRD = {
  id: "120363418804796632@newsletter", // Cambia por tu canal si quieres
  name: "🩵̶۫̄͟Ⓜ︎𓏲𝐌500𓍲̈͜𝗨̴ᥣ̥𝗍̈rᥲ̄𓊓̵̬𝐂h҉a҉n҉n̸e҉l҉⋆͙̈么͟͞──"
};

export async function before(m, { conn, participants, groupMetadata }) {
  if (
    !m.messageStubType ||
    !m.isGroup ||
    !m.messageStubParameters?.[0] ||
    !global.db.data.chats[m.chat]?.welcome
  ) return !0

  const jid = m.messageStubParameters[0]
  const user = `@${jid.split('@')[0]}`
  const thumbnailUrl = 'https://qu.ax/EUstl.jpg'
  const pp = await conn.profilePictureUrl(jid, 'image').catch(() => thumbnailUrl)
  const img = await fetch(pp).then(r => r.buffer())
  const total = [28, 32].includes(m.messageStubType)
    ? participants.length - 1
    : participants.length + 1

  // Contexto newsletter/canal
  const contextNewsletter = {
    isForwarded: true,
    forwardingScore: 999,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1
    },
    externalAdReply: {
      title: channelRD.name,
      body: '🩵̶۫̄͟Ⓜ︎𓏲𝐌500𓍲̈͜𝗨̴ᥣ̥𝗍̈rᥲ̄𓊓̵̬Bot⋆͙̈么͟͞──',
      thumbnailUrl: thumbnailUrl,
      mediaType: 1,
      renderLargerThumbnail: false,
      sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
    }
  };

  // Mensaje citado para bienvenida/despedida
  const quotedMsg = (txt) => ({
    key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: m.chat, id: Math.random().toString(36).slice(2) },
    message: { conversation: txt }
  });

  if (m.messageStubType == 27) {
    const bienvenida = `
💎 WELCOME - USER 💎

🩵 Usuario: ${user}
🩵 Grupo: ${groupMetadata.subject}
🩵 Miembros: ${total}

⌬ Usa *#help* para ver los comandos disponibles
`
    // Mensaje de bienvenida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: bienvenida, 
      contextInfo: contextNewsletter 
    });
    // Mensaje adicional, respondiendo a 《✧》 LLEGO OTRO
    await conn.sendMessage(m.chat, { 
      text: 'SE NOS UNIÓ UN USUARIO', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('《✧》 LLEGO OTRO GAY JAJAJA') });
  }

  if ([28, 32].includes(m.messageStubType)) {
    const despedida = `
💎 ADIOS - USER 💎

🩵 Usuario: ${user}
🩵 Grupo: ${groupMetadata.subject}
🩵 Miembros: ${total}

⌬ Espero y vuelvas después.
`
    // Mensaje de despedida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: despedida, 
      contextInfo: contextNewsletter 
    });
    // Segundo mensaje, respondiendo a 《✧》 SE FUE
    await conn.sendMessage(m.chat, { 
      text: 'SE NOS FUE EL USUARIO', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('《✧》 SE FUE GAY XD') });
  }
}