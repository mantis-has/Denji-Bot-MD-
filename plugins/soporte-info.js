
import { isOwnerOrSupport } from './soporte-verificar.js';

const handler = async (m, { conn, text }) => {
  if (!isOwnerOrSupport(m.sender)) {
    return conn.reply(m.chat, '🚫 Este comando es exclusivo para el equipo de soporte.', m);
  }

  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false;
  
  if (!who) {
    return conn.reply(m.chat, '🚩 Menciona a un usuario para ver su información.', m);
  }

  const user = global.db.data.users[who];
  if (!user) {
    return conn.reply(m.chat, '🚩 Usuario no encontrado en la base de datos.', m);
  }

  const userInfo = `
*╭─────────────────◆*
*│    👤 INFORMACIÓN DE USUARIO*
*╰─────────────────◆*

*📱 Usuario:* @${who.replace('@s.whatsapp.net', '')}
*📝 Nombre:* ${user.name || 'No registrado'}
*🎂 Edad:* ${user.age || 'No registrada'}
*💎 Diamantes:* ${user.chocolates || 0}
*💰 Dinero:* ${user.money || 0}
*⭐ Nivel:* ${user.level || 0}
*📊 Experiencia:* ${user.exp || 0}
*👑 Premium:* ${user.premium ? 'Sí' : 'No'}
*⚠️ Advertencias:* ${user.warn || 0}
*🚫 Baneado:* ${user.banned ? 'Sí' : 'No'}
*📅 Registrado:* ${user.registered ? 'Sí' : 'No'}

*🕐 Última actividad:*
*💰 Último claim:* ${user.lastclaim ? new Date(user.lastclaim).toLocaleString() : 'Nunca'}
*⛏️ Última minería:* ${user.lastmining ? new Date(user.lastmining).toLocaleString() : 'Nunca'}`;

  conn.reply(m.chat, userInfo, m, { mentions: [who] });
};

handler.command = ['soporteinfo', 'supportinfo'];
handler.tags = ['soporte'];
export default handler;
