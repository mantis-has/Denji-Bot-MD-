
let handler = async (m, { conn, participants, isAdmin, isOwner, isROwner }) => {
  // Verificar que sea un grupo
  if (!m.isGroup) {
    return conn.reply(m.chat, `❌ Este comando solo funciona en grupos.`, m)
  }

  // Verificar que el usuario sea admin
  if (!isAdmin && !isOwner && !isROwner) {
    return conn.reply(m.chat, `❌ Solo los administradores pueden usar este comando.`, m)
  }

  // Verificar que el bot sea admin
  const botJid = conn.user.jid
  const bot = participants.find(u => conn.decodeJid(u.id) === botJid)
  if (!bot?.admin) {
    return conn.reply(m.chat, `❌ Necesito ser administrador para eliminar miembros.`, m)
  }

  // Obtener todos los participantes que no sean admins ni el bot
  const membersToRemove = participants.filter(participant => {
    const jid = conn.decodeJid(participant.id)
    // Excluir administradores, super admins y el bot
    return !participant.admin && jid !== botJid
  })

  if (membersToRemove.length === 0) {
    return conn.reply(m.chat, `❌ No hay miembros disponibles para eliminar (solo hay admins y el bot).`, m)
  }

  // Seleccionar víctima aleatoria
  const randomIndex = Math.floor(Math.random() * membersToRemove.length)
  const victim = membersToRemove[randomIndex]
  const victimJid = conn.decodeJid(victim.id)

  try {
    // Mensaje dramático antes de eliminar
    const ruletaMsg = `
🎰 ¡RULETABAN ACTIVADA! 🎰

🎯 La ruleta ha decidido...
💀 La víctima elegida es: @${victimJid.split('@')[0]}

⚡ En 3 segundos serás eliminado del grupo...
😈 ¡Que la suerte no esté de tu lado!
    `.trim()

    await conn.reply(m.chat, ruletaMsg, m, { mentions: [victimJid] })

    // Esperar 3 segundos para el drama
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Eliminar al miembro
    await conn.groupParticipantsUpdate(m.chat, [victimJid], 'remove')

    // Mensaje de confirmación
    const confirmMsg = `
💥 ¡ELIMINADO! 💥

🎰 La ruletaban ha hablado
👻 @${victimJid.split('@')[0]} ha sido expulsado del grupo
⚰️ Que descanse en paz... hasta que vuelva
🎭 Los administradores están a salvo... por ahora
    `.trim()

    await conn.reply(m.chat, confirmMsg, m, { mentions: [victimJid] })

  } catch (error) {
    console.error('Error en ruletaban:', error)
    await conn.reply(m.chat, `❌ Error al eliminar al miembro. Verifica que tenga los permisos necesarios.`, m)
  }
}

handler.help = ['ruletaban']
handler.tags = ['grupo']
handler.command = ['ruletaban', 'banroulette', 'ruleta']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
