
let handler = async (m, { conn, participants, isROwner }) => {
  // Verificar que sea un grupo
  if (!m.isGroup) {
    return conn.reply(m.chat, `❌ Este comando solo funciona en grupos.`, m)
  }

  // Solo el owner puede usar este comando
  if (!isROwner) {
    return conn.reply(m.chat, `❌ Solo el owner del bot puede usar este comando.`, m)
  }

  // Verificar que el bot sea admin
  const botJid = conn.user.jid
  const bot = participants.find(u => conn.decodeJid(u.id) === botJid)
  if (!bot?.admin) {
    return conn.reply(m.chat, `❌ Necesito ser administrador para eliminar miembros.`, m)
  }

  // Obtener todos los participantes excepto admins y el bot
  const membersToKick = participants.filter(participant => {
    const jid = conn.decodeJid(participant.id)
    // Excluir administradores, super admins y el bot
    return !participant.admin && jid !== botJid
  })

  if (membersToKick.length === 0) {
    return conn.reply(m.chat, `❌ No hay miembros para expulsar (solo hay admins y el bot).`, m)
  }

  try {
    // Mensaje de advertencia
    const warningMsg = `
⚠️ 🚨 ALERTA MÁXIMA 🚨 ⚠️

💀 El owner ha iniciado una PURGA TOTAL
🔥 TODOS los miembros serán expulsados en 5 segundos
👑 Solo los administradores sobrevivirán
⚡ ¡PREPÁRENSE PARA EL APOCALIPSIS!

💥 Iniciando expulsión masiva...
    `.trim()

    await conn.reply(m.chat, warningMsg, m)

    // Esperar 5 segundos para el drama
    await new Promise(resolve => setTimeout(resolve, 5000))

    // Obtener los JIDs de todos los miembros a expulsar
    const jidsToKick = membersToKick.map(participant => conn.decodeJid(participant.id))

    // Expulsar a todos los miembros de una vez
    await conn.groupParticipantsUpdate(m.chat, jidsToKick, 'remove')

    // Mensaje de confirmación
    const confirmMsg = `
💥 ¡PURGA COMPLETADA! 💥

🔥 La limpieza ha terminado
👻 ${jidsToKick.length} miembros han sido expulsados
👑 Solo los elegidos permanecen
⚰️ El grupo ha sido purificado

🎭 Misión cumplida, owner.
    `.trim()

    await conn.reply(m.chat, confirmMsg, m)

  } catch (error) {
    console.error('Error en kickall:', error)
    await conn.reply(m.chat, `❌ Error al expulsar miembros. Verifica que tenga los permisos necesarios.`, m)
  }
}

handler.help = ['kickall']
handler.tags = ['owner']
handler.command = ['kickall', 'purga', 'expulsartodos']
handler.group = true
handler.rowner = true
handler.botAdmin = true

export default handler
