
import { isOwnerOrSupport } from './soporte-verificar.js';

const handler = async (m, { conn, text }) => {
  if (!isOwnerOrSupport(m.sender)) {
    return conn.reply(m.chat, '🚫 Este comando es exclusivo para el equipo de soporte.', m);
  }

  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  
  if (!who) {
    return conn.reply(m.chat, '🚩 Menciona a un usuario para desbanearlo.', m);
  }

  const user = global.db.data.users[who];
  if (!user || !user.banned) {
    return conn.reply(m.chat, '🚩 El usuario no está baneado.', m);
  }

  user.banned = false;
  user.bannedReason = '';

  const supportName = global.db.data.soporte.find(s => s.number === m.sender)?.name || 'Soporte';
  
  conn.reply(m.chat, `✅ Usuario desbaneado exitosamente.\n\n👤 *Usuario:* @${who.replace('@s.whatsapp.net', '')}\n🛡️ *Desbaneado por:* ${supportName}\n📅 *Fecha:* ${new Date().toLocaleString()}`, m, { mentions: [who] });
};

handler.command = ['soporteunban', 'supportunban'];
handler.tags = ['soporte'];
export default handler;
