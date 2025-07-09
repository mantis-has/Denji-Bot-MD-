
import fetch from 'node-fetch';

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys || m.isGroup && !isBotAdmin) return;
  
  let chat = global.db.data.chats[m.chat];
  if (!chat?.autoinstagram) return;
  
  // Detectar URLs de Instagram
  let igRegex = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|tv)\/[\w\-]+\/?/gi;
  let match = igRegex.exec(m.text);
  
  if (match) {
    m.react('⏳');
    
    try {
      let response = await fetch(`https://api.downloadgram.com/media?url=${encodeURIComponent(match[0])}`);
      let data = await response.json();
      
      if (!data.media || data.media.length === 0) throw new Error('No se pudo procesar');

      let caption = `📸 *DESCARGA AUTOMÁTICA INSTAGRAM*\n\n`;
      caption += `📝 *Descripción:* ${data.caption || 'Sin descripción'}\n`;
      caption += `👤 *Usuario:* ${data.username || 'Desconocido'}\n`;
      caption += `🤖 *Descarga automática activada*`;

      let media = data.media[0];
      
      if (media.type === 'video') {
        await conn.sendMessage(m.chat, {
          video: { url: media.url },
          caption: caption
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, {
          image: { url: media.url },
          caption: caption
        }, { quoted: m });
      }

      m.react('✅');
      
    } catch (error) {
      m.react('❌');
      console.error('Error en descarga automática Instagram:', error);
    }
  }
}

let handler = async (m, { conn, command }) => {
  let chat = global.db.data.chats[m.chat];
  
  if (command === 'autoig') {
    chat.autoinstagram = !chat.autoinstagram;
    m.reply(`🤖 Descarga automática de Instagram ${chat.autoinstagram ? 'activada' : 'desactivada'}`);
  }
};

handler.help = ['autoig'];
handler.tags = ['downloader'];
handler.command = /^(autoig)$/i;
handler.group = true;
handler.admin = true;

export default handler;
