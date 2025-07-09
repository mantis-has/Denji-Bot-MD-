
import { isOwnerOrSupport } from './soporte-verificar.js';

const handler = async (m, { conn }) => {
  // Verificar si es owner o soporte
  if (!isOwnerOrSupport(m.sender)) {
    return conn.reply(m.chat, '🚫 Este comando es exclusivo para el equipo de soporte.', m);
  }

  const menuText = `
*╭─────────────────◆*
*│    🛠️ MENÚ DE SOPORTE*
*╰─────────────────◆*

*🔧 COMANDOS DISPONIBLES:*

*📋 GESTIÓN DE USUARIOS:*
• \`/soporteinfo @usuario\` - Ver info de usuario
• \`/soporteban @usuario\` - Banear usuario  
• \`/soporteunban @usuario\` - Desbanear usuario
• \`/soportewarn @usuario\` - Dar advertencia
• \`/soportepremium @usuario\` - Dar premium temporal

*📊 ESTADÍSTICAS:*
• \`/soportestats\` - Ver estadísticas del bot
• \`/soporteusuarios\` - Ver usuarios activos
• \`/soportegrupos\` - Ver grupos del bot

*💬 COMUNICACIÓN:*
• \`/soportebc\` - Broadcast a todos los usuarios
• \`/soportebcgc\` - Broadcast a todos los grupos
• \`/soportemsg @usuario\` - Mensaje directo

*⚙️ MODERACIÓN:*
• \`/soportelimpiar\` - Limpiar chat actual
• \`/soportekick @usuario\` - Expulsar del grupo
• \`/soportesilence @usuario\` - Silenciar usuario

*🔍 HERRAMIENTAS:*
• \`/soportebuscar\` - Buscar usuario por nombre
• \`/soportebackup\` - Crear backup de datos
• \`/soportelogs\` - Ver logs del sistema

*╭─────────────────◆*
*│  💫 Powered by ${global.namebot}*
*│  🛡️ Panel de Soporte*
*╰─────────────────◆*`;

  conn.reply(m.chat, menuText, m);
};

handler.command = ['soportemenu', 'menusoporte', 'supportmenu'];
handler.tags = ['soporte'];
export default handler;
