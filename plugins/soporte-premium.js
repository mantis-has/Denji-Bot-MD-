
import { isOwnerOrSupport } from './soporte-verificar.js';

const handler = async (m, { conn, text, args }) => {
  if (!isOwnerOrSupport(m.sender)) {
    return conn.reply(m.chat, '🚫 Este comando es exclusivo para el equipo de soporte.', m);
  }

  const who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  const days = args[1] ? parseInt(args[1]) : 7;
  
  if (!who) {
    return conn.reply(m.chat, '🚩 Menciona a un usuario y opcionalmente los días de premium.\n\nEjemplo: /soportepremium @usuario 30', m);
  }

  if (isNaN(days) || days <= 0) {
    return conn.reply(m.chat, '🚩 El número de días debe ser válido y mayor a 0.', m);
  }

  const user = global.db.data.users[who];
  if (!user) {
    return conn.reply(m.chat, '🚩 Usuario no encontrado en la base de datos.', m);
  }

  const premiumTime = days * 24 * 60 * 60 * 1000; // días a milisegundos
  user.premium = true;
  user.premiumTime = Date.now() + premiumTime;

  const supportName = global.db.data.soporte.find(s => s.number === m.sender)?.name || 'Soporte';
  
  conn.reply(m.chat, `✅ Premium otorgado exitosamente!\n\n👤 *Usuario:* @${who.replace('@s.whatsapp.net', '')}\n⭐ *Duración:* ${days} días\n🛡️ *Otorgado por:* ${supportName}\n📅 *Expira:* ${new Date(user.premiumTime).toLocaleString()}`, m, { mentions: [who] });
};

handler.command = ['soportepremium', 'supportpremium'];
handler.tags = ['soporte'];
export default handler;
