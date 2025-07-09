
const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const why = `🚩 Por favor, menciona a un usuario para quitar del soporte.`;
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  
  if (!who) return conn.reply(m.chat, why, m, {mentions: [m.sender]});
  
  // Verificar si existe la lista de soporte
  if (!global.db.data.soporte || global.db.data.soporte.length === 0) {
    return conn.reply(m.chat, `🚩 No hay usuarios en la lista de soporte.`, m);
  }
  
  // Buscar el índice del usuario
  const index = global.db.data.soporte.findIndex(user => user.number === who);
  
  if (index === -1) {
    return conn.reply(m.chat, `🚩 El usuario no está en la lista de soporte.`, m);
  }
  
  // Eliminar del soporte
  global.db.data.soporte.splice(index, 1);
  
  conn.reply(m.chat, `✅ Usuario eliminado del soporte exitosamente.\n\n👤 *Usuario:* @${who.replace('@s.whatsapp.net', '')}`, m, {mentions: [who]});
};

handler.command = ['delsoporte', 'eliminarsoporte'];
handler.rowner = true;
export default handler;
