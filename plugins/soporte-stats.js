
import { isOwnerOrSupport } from './soporte-verificar.js';

const handler = async (m, { conn }) => {
  if (!isOwnerOrSupport(m.sender)) {
    return conn.reply(m.chat, '🚫 Este comando es exclusivo para el equipo de soporte.', m);
  }

  const users = Object.keys(global.db.data.users);
  const chats = Object.keys(global.db.data.chats);
  const bannedUsers = Object.values(global.db.data.users).filter(user => user.banned).length;
  const premiumUsers = Object.values(global.db.data.users).filter(user => user.premium).length;
  const registeredUsers = Object.values(global.db.data.users).filter(user => user.registered).length;

  const stats = `
*╭─────────────────◆*
*│    📊 ESTADÍSTICAS DEL BOT*
*╰─────────────────◆*

*👥 USUARIOS:*
• Total: ${users.length}
• Registrados: ${registeredUsers}
• Premium: ${premiumUsers}
• Baneados: ${bannedUsers}

*💬 CHATS:*
• Total: ${chats.length}
• Grupos: ${chats.filter(chat => chat.endsWith('@g.us')).length}
• Privados: ${chats.filter(chat => !chat.endsWith('@g.us')).length}

*🛡️ SOPORTE:*
• Miembros activos: ${global.db.data.soporte?.length || 0}
• Owners: ${global.owner.length}

*📈 RENDIMIENTO:*
• Uptime: ${process.uptime().toFixed(2)} segundos
• Memoria: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB

*📅 Generado:* ${new Date().toLocaleString()}

*╭─────────────────◆*
*│  💫 Panel de Soporte*
*╰─────────────────◆*`;

  conn.reply(m.chat, stats, m);
};

handler.command = ['soportestats', 'supportstats'];
handler.tags = ['soporte'];
export default handler;
