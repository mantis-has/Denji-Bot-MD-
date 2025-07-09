import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const channelRD = {
  id: "120363402362088282@newsletter", // Cambia por tu canal si quieres
  name: "⁖ฺ۟̇࣪·֗٬̤⃟🔥𝐃𝐞𝐧𝐣𝐢 ✰ 𝐂𝐡𝐚𝐧𝐧𝐞𝐥 ⬣"
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
  const thumbnailUrl = 'https://qu.ax/UMbGb.jpg'
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
      body: '⁖ฺ۟̇࣪·֗٬̤⃟🔥𝐃𝐞𝐧𝐣𝐢 ✰ 𝐁𝐨𝐭 𝐌𝐃 ⬣',
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
╭─⬣「 ✰BIENVENIO✰ 」⬣
┃
┃🔥 Usuario: ${user}
┃🔥 Grupo: ${groupMetadata.subject}
┃🔥 Miembros: ${total}
┃
┃⌬ Usa *#help* para ver los comandos disponibles.
╚━━━━━━━━━━━━━━━╝
`
    // Mensaje de bienvenida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: bienvenida, 
      contextInfo: contextNewsletter 
    });
    // Mensaje adicional, respondiendo a 《✧》 LLEGO OTRO
    await conn.sendMessage(m.chat, { 
      text: 'Hola Bienvenid@.', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('Quisiera ver a mi querida Makima') });
  }

  if ([28, 32].includes(m.messageStubType)) {
    const despedida = `
╭─⬣「 ✰ADIOS✰ 」⬣
┃
┃💥 Usuario: ${user}
┃🔥 Grupo: ${groupMetadata.subject}
┃💥 Miembros: ${total}
┃
┃⌬ Espero y vuelvas después.
╚━━━━━━━━━━━━━━━╝
`
    // Mensaje de despedida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: despedida, 
      contextInfo: contextNewsletter 
    });
    // Segundo mensaje, respondiendo a 《✧》 SE FUE
    await conn.sendMessage(m.chat, { 
      text: 'Espero y el usuario vuelva pronto.', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('Nunca dejare de amar a Makima') });
  }
}