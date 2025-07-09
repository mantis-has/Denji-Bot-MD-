
import { isOwnerOrSupport } from './soporte-verificar.js';

const handler = async (m, { conn, text }) => {
  if (!isOwnerOrSupport(m.sender)) {
    return conn.reply(m.chat, '🚫 Este comando es exclusivo para el equipo de soporte.', m);
  }

  if (!text) {
    return conn.reply(m.chat, '🚩 Escribe el mensaje que quieres enviar a todos los usuarios.', m);
  }

  const users = Object.keys(global.db.data.users);
  const supportName = global.db.data.soporte.find(s => s.number === m.sender)?.name || 'Equipo de Soporte';
  
  const message = `
*╭─────────────────◆*
*│    📢 MENSAJE DEL SOPORTE*
*╰─────────────────◆*

${text}

*🛡️ Enviado por:* ${supportName}
*📅 Fecha:* ${new Date().toLocaleString()}

*╭─────────────────◆*
*│  💫 ${global.namebot}*
*╰─────────────────◆*`;

  let sent = 0;
  let failed = 0;

  conn.reply(m.chat, `📤 Enviando mensaje a ${users.length} usuarios...`, m);

  for (const userId of users) {
    try {
      await conn.sendMessage(userId, { text: message });
      sent++;
      await new Promise(resolve => setTimeout(resolve, 100)); // Delay para evitar spam
    } catch {
      failed++;
    }
  }

  conn.reply(m.chat, `✅ Broadcast completado!\n\n📤 Enviados: ${sent}\n❌ Fallidos: ${failed}`, m);
};

handler.command = ['soportebc', 'supportbc'];
handler.tags = ['soporte'];
export default handler;
