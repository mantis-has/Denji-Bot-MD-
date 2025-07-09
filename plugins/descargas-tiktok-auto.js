
import fetch from 'node-fetch';

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys || m.isGroup && !isBotAdmin) return;
  
  let chat = global.db.data.chats[m.chat];
  if (!chat?.autotiktok) return;
  
  // Detectar URLs de TikTok
  let ttRegex = /(?:https?:\/\/)?(?:www\.|vm\.|vt\.)?tiktok\.com\/[\w\-\.\/\?\=\&]*/gi;
  let match = ttRegex.exec(m.text);
  
  if (match) {
    m.react('⏳');
    
    try {
      let response = await fetch(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(match[0])}`);
      let data = await response.json();
      
      if (!data.video) throw new Error('No se pudo procesar');

      let caption = `🎵 *DESCARGA AUTOMÁTICA TIKTOK*\n\n`;
      caption += `📝 *Título:* ${data.title || 'Video de TikTok'}\n`;
      caption += `👤 *Autor:* ${data.author || 'Desconocido'}\n`;
      caption += `🤖 *Descarga automática activada*`;

      await conn.sendMessage(m.chat, {
        video: { url: data.video.noWatermark || data.video.watermark },
        caption: caption
      }, { quoted: m });

      m.react('✅');
      
    } catch (error) {
      m.react('❌');
      console.error('Error en descarga automática TikTok:', error);
    }
  }
}

let handler = async (m, { conn, command }) => {
  let chat = global.db.data.chats[m.chat];
  
  if (command === 'autotiktok') {
    chat.autotiktok = !chat.autotiktok;
    m.reply(`🤖 Descarga automática de TikTok ${chat.autotiktok ? 'activada' : 'desactivada'}`);
  }
};

handler.help = ['autotiktok'];
handler.tags = ['downloader'];
handler.command = /^(autotiktok)$/i;
handler.group = true;
handler.admin = true;

export default handler;
