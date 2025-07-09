// Plugin: Lista de Bots Activos (Makima MD)
// Codigo creado por Félix Manuel (github.com/mantis-has) para sistema Makima MD

const channelRD = {
  id: "120363402362088282@newsletter", // Cambia por tu canal si quieres
  name: "⏤͟͞ू⃪🔥𝐃𝐞𝐧𝐣𝐢 𝐂𝐡𝐚𝐧𝐧𝐞𝐥"
}
const thumbnailUrl = 'https://qu.ax/lRCWR.jpg' // Imagen cuadrada y pequeña

async function handler(m, { conn: stars }) {
  let uniqueUsers = new Map()

  global.conns.forEach((conn) => {
    if (conn.user && conn.ws && conn.ws.socket && conn.ws.socket.readyState === 1) {
      uniqueUsers.set(conn.user.jid, conn)
    }
  })

  // Clasificación de bots (ajusta las condiciones si tienes flags)
  let users = [...uniqueUsers.values()]
  let principales = users.filter(v => v.user?.isMain) // Cambia si tienes otro flag para principal
  let prembots = users.filter(v => v.user?.isPremium) // Cambia si tienes otro flag para premium
  let subbots = users.filter(v => !v.user?.isMain && !v.user?.isPremium)

  // Bots presentes en el grupo actual
  let groupParticipants = (await stars.groupMetadata(m.chat).catch(() => ({}))).participants || []
  let botsEnGrupo = users.filter(v => groupParticipants.some(p => p.id === v.user?.jid))
  let listaBotsGrupo = botsEnGrupo.map(v => {
    let nombre = v.user?.name || "Sin Nombre"
    let tipo = v.user?.isMain
      ? "Bot Oficial"
      : v.user?.isPremium
      ? "Prem-Bot"
      : "SubBot"
    return `• ${nombre} (${tipo})`
  }).join('\n') || 'No identificado.'

  let responseMessage = 
`LISTA DE BOTS ACTIVOS

principales: 1
Prem-Bots: 1
Subbots: ${subbots.length}

En este grupo:

${listaBotsGrupo}
`

  // Newsletter context info
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
      body: '╭─⬣「 ✰BOTS ACTIVOS✰ 」⬣',
      thumbnailUrl: thumbnailUrl,
      mediaType: 1,
      renderLargerThumbnail: false,
      sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
    }
  };

  await stars.sendMessage(m.chat, {
    image: { url: thumbnailUrl },
    caption: responseMessage,
    contextInfo: contextNewsletter
  }, { quoted: m }) // <-- RESPONDE al mensaje de la persona
}

handler.command = ['listjadibot', 'bots']
handler.help = ['bots']
handler.tags = ['jadibot']

export default handler