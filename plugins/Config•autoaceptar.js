let handler = m => m

handler.before = async function (m, { conn, isAdmin, isBotAdmin }) {
  if (!m.isGroup) return false
  const chat = global.db.data.chats[m.chat]
  if (!chat.autoAceptar || isAdmin) return false
  if (!isBotAdmin) return true

  const latinPrefix = '5'
  
  try {
    // Verifica lista de solicitudes
    const participants = await conn.groupRequestParticipantsList(m.chat)
    const filtered = participants.filter(p => p.jid.startsWith(latinPrefix) && p.jid.endsWith('@s.whatsapp.net'))

    for (const p of filtered) {
      await conn.groupRequestParticipantsUpdate(m.chat, [p.jid], "approve")
    }

    // También aprueba si el stubType 172 (solicitud directa) lo amerita
    if (m.messageStubType === 172 && m.messageStubParameters?.length) {
      const [jid] = m.messageStubParameters
      if (jid.startsWith(latinPrefix) && jid.endsWith('@s.whatsapp.net')) {
        await conn.groupRequestParticipantsUpdate(m.chat, [jid], "approve")
      }
    }
  } catch (e) {
    console.error(`[AutoAceptar Error]`, e)
  }

  return false
}

export default handler