
import { ytmp4 } from '../lib/y2mate.js';

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys || m.isGroup && !isBotAdmin) return;
  
  let chat = global.db.data.chats[m.chat];
  if (!chat?.autodownload) return;
  
  // Detectar URLs de YouTube en mensajes
  let ytRegex = /(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)/gi;
  let match = ytRegex.exec(m.text);
  
  if (match) {
    m.react('⏳');
    
    try {
      let result = await ytmp4(match[0]);
      if (!result) throw new Error('No se pudo procesar');

      let caption = `🎥 *DESCARGA AUTOMÁTICA*\n\n`;
      caption += `📝 *Título:* ${result.title}\n`;
      caption += `⚡ *Calidad:* ${result.quality}\n`;
      caption += `📊 *Tamaño:* ${result.size}\n`;
      caption += `🤖 *Descarga automática activada*`;

      await conn.sendMessage(m.chat, {
        video: { url: result.link },
        mimetype: 'video/mp4',
        fileName: `${result.title}.mp4`,
        caption: caption
      }, { quoted: m });

      m.react('✅');
      
    } catch (error) {
      m.react('❌');
      console.error('Error en descarga automática:', error);
    }
  }
}

// Comando para activar/desactivar descarga automática
let handler = async (m, { conn, command }) => {
  let chat = global.db.data.chats[m.chat];
  
  if (command === 'autoyt') {
    chat.autodownload = !chat.autodownload;
    m.reply(`🤖 Descarga automática de YouTube ${chat.autodownload ? 'activada' : 'desactivada'}`);
  }
};

handler.help = ['autoyt'];
handler.tags = ['downloader'];
handler.command = /^(autoyt)$/i;
handler.group = true;
handler.admin = true;

export default handler;
