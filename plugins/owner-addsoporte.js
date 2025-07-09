
const handler = async (m, { conn, text, args, usedPrefix, command }) => {
  const why = `🚩 Por favor, menciona a un usuario para agregar como soporte.`;
  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  
  if (!who) return conn.reply(m.chat, why, m, {mentions: [m.sender]});
  
  // Inicializar la lista de soporte si no existe
  if (!global.db.data.soporte) {
    global.db.data.soporte = [];
  }
  
  // Verificar si ya está en la lista
  const yaEsSoporte = global.db.data.soporte.some(user => user.number === who);
  if (yaEsSoporte) {
    return conn.reply(m.chat, `🚩 El usuario ya está en la lista de soporte.`, m);
  }
  
  // Agregar a la lista de soporte
  const userData = {
    number: who,
    name: m.quoted?.pushName || text || 'Usuario',
    addedBy: m.sender,
    addedDate: new Date().toISOString()
  };
  
  global.db.data.soporte.push(userData);
  
  conn.reply(m.chat, `✅ Usuario agregado como soporte exitosamente.\n\n👤 *Usuario:* @${who.replace('@s.whatsapp.net', '')}\n📅 *Fecha:* ${new Date().toLocaleDateString()}`, m, {mentions: [who]});
};

handler.command = ['addsoporte', 'agregarsoporte'];
handler.rowner = true;
export default handler;
