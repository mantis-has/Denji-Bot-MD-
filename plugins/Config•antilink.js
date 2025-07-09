let linkRegex = /(https?:\/\/(?:www\.)?(?:t\.me|telegram\.me|whatsapp\.com)\/\S+)|(https?:\/\/chat\.whatsapp\.com\/\S+)|(https?:\/\/whatsapp\.com\/channel\/\S+)/i

export async function before(m, { isAdmin, isBotAdmin, conn }) {
  if (m.isBaileys && m.fromMe) return !0
  if (!m.isGroup) return !1

  let chat = global.db.data.chats[m.chat]
  let settings = global.db.data.settings[this.user.jid] || {}
  let grupo = `https://chat.whatsapp.com`
  let isGroupLink = linkRegex.exec(m.text)

  if (!chat.antiLink || !m.text || !isGroupLink) return !0
  if (isAdmin && m.text.includes(grupo)) {
    return conn.reply(m.chat, `💥 *Enlace detect, eres admin, seras perdonado.*`, m)
  }

  if (!isAdmin) {
    // Si el bot no es admin
    if (!isBotAdmin) {
      return conn.reply(m.chat, `🔥 *No puedo eliminar a la persona porque no soy admin en el grupo...*`, m)
    }

    // Evita expulsar por link del mismo grupo
    const thisGroupLink = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`
    if (m.text.includes(thisGroupLink)) return !0

    // Acción anti-link
    await conn.reply(
      m.chat,
      `📎 *¡ANTI LINK AVTIVADO!*\n\n💥 *${await conn.getName(m.sender)}* ha compartido un enlace en el grupo.\n\n*seras eliminado...*`,
      m
    )

    if (settings.restrict) {
      try {
        // Borra el mensaje
        await conn.sendMessage(m.chat, {
          delete: {
            remoteJid: m.chat,
            fromMe: false,
            id: m.key.id,
            participant: m.key.participant,
          },
        })

        // Expulsa al usuario
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
      } catch (e) {
        return conn.reply(m.chat, `🚫 *Error al intentar eliminar: ${e}*`, m)
      }
    } else {
      return conn.reply(m.chat, `💥 *Restricción desactivada por mi creadora, no puedo expulsar.*`, m)
    }
  }

  return !0
}