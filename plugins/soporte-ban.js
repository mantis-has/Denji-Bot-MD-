
import { isOwnerOrSupport } from './soporte-verificar.js';

const handler = async (m, { conn, text }) => {
  if (!isOwnerOrSupport(m.sender)) {
    return conn.reply(m.chat, '🚫 Este comando es exclusivo para el equipo de soporte.', m);
  }

  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  
  if (!who) {
    return conn.reply(m.chat, '🚩 Menciona a un usuario para banearlo.', m);
  }

  const user = global.db.data.users[who];
  if (!user) {
    global.db.data.users[who] = {
      banned: true,
      bannedReason: 'Baneado por soporte',
      name: 'Usuario',
      exp: 0,
      chocolates: 0,
      money: 0,
      level: 0,
      warn: 0,
      premium: false,
      registered: false
    };
  } else {
    user.banned = true;
    user.bannedReason = 'Baneado por equipo de soporte';
  }

  const supportName = global.db.data.soporte.find(s => s.number === m.sender)?.name || 'Soporte';
  
  conn.reply(m.chat, `✅ Usuario baneado exitosamente.\n\n👤 *Usuario:* @${who.replace('@s.whatsapp.net', '')}\n🛡️ *Baneado por:* ${supportName}\n📅 *Fecha:* ${new Date().toLocaleString()}`, m, { mentions: [who] });
};

handler.command = ['soporteban', 'supportban'];
handler.tags = ['soporte'];
export default handler;
