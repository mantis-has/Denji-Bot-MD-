
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`🎵 *Uso:* ${usedPrefix + command} <url_tiktok>\n\n*Ejemplo:* ${usedPrefix + command} https://vm.tiktok.com/VIDEO_ID`);
  
  if (!/tiktok/i.test(args[0])) {
    return m.reply('❌ URL de TikTok inválida');
  }

  m.react('⏳');
  
  try {
    // API de TikTok downloader
    let response = await fetch(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(args[0])}`);
    let data = await response.json();
    
    if (!data.video) throw new Error('No se encontró el video');

    let caption = `🎵 *DESCARGA TIKTOK*\n\n`;
    caption += `📝 *Título:* ${data.title || 'Video de TikTok'}\n`;
    caption += `👤 *Autor:* ${data.author || 'Desconocido'}\n`;
    caption += `❤️ *Likes:* ${data.stats?.likes || 'N/A'}\n`;
    caption += `💬 *Comentarios:* ${data.stats?.comments || 'N/A'}\n`;
    caption += `🔗 *URL:* ${args[0]}`;

    await conn.sendMessage(m.chat, {
      video: { url: data.video.noWatermark || data.video.watermark },
      caption: caption
    }, { quoted: m });

    // Enviar audio si está disponible
    if (data.music) {
      await conn.sendMessage(m.chat, {
        audio: { url: data.music },
        mimetype: 'audio/mpeg',
        fileName: 'tiktok_audio.mp3'
      }, { quoted: m });
    }

    m.react('✅');
    
  } catch (error) {
    m.react('❌');
    m.reply(`❌ Error: ${error.message}`);
  }
};

handler.help = ['tiktok', 'tt', 'tikdown'];
handler.tags = ['downloader'];
handler.command = /^(tiktok|tt|tikdown)$/i;
handler.limit = true;

export default handler;
