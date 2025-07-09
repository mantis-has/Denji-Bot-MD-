
import { ytdl, ytmp3, ytmp4 } from '../lib/y2mate.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`🎥 *Uso:* ${usedPrefix + command} <url_youtube>\n\n*Ejemplo:* ${usedPrefix + command} https://youtube.com/watch?v=VIDEO_ID`);
  
  if (!/^(?:https?:\/\/)?(?:www\.|m\.|music\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/.test(args[0])) {
    return m.reply('❌ URL de YouTube inválida');
  }

  m.react('⏳');
  
  try {
    let type = command.includes('mp3') || command.includes('audio') ? 'audio' : 'video';
    let result;
    
    if (type === 'audio') {
      result = await ytmp3(args[0]);
    } else {
      result = await ytmp4(args[0]);
    }

    if (!result) throw new Error('No se pudo procesar el video');

    let caption = `🎥 *DESCARGA YOUTUBE*\n\n`;
    caption += `📝 *Título:* ${result.title}\n`;
    caption += `⚡ *Calidad:* ${result.quality}\n`;
    caption += `📊 *Tamaño:* ${result.size}\n`;
    caption += `🎵 *Tipo:* ${type === 'audio' ? 'Audio (MP3)' : 'Video (MP4)'}\n`;
    caption += `🔗 *URL:* ${args[0]}`;

    if (type === 'audio') {
      await conn.sendMessage(m.chat, {
        audio: { url: result.link },
        mimetype: 'audio/mpeg',
        fileName: `${result.title}.mp3`,
        caption: caption
      }, { quoted: m });
    } else {
      await conn.sendMessage(m.chat, {
        video: { url: result.link },
        mimetype: 'video/mp4',
        fileName: `${result.title}.mp4`,
        caption: caption
      }, { quoted: m });
    }

    m.react('✅');
    
  } catch (error) {
    m.react('❌');
    m.reply(`❌ Error: ${error.message}`);
  }
};

handler.help = ['ytmp3', 'ytmp4', 'youtubedl'];
handler.tags = ['downloader'];
handler.command = /^(ytmp[34]|youtubedl|ytdl)$/i;
handler.limit = true;

export default handler;
