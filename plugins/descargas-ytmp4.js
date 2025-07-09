// Code by wirk 
import fetch from 'node-fetch';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text || !/^https?:\/\/(www\.youtube\.com|youtu\.be)/i.test(text)) {
      return m.reply('🔗 *Ingresa un enlace de YouTube válido!*');
    }

    // Reacción ;)  
    await m.react('🕒');

    const res = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.status || !json.result?.download?.url) {
      throw new Error('❌ No se pudo descargar el video.');
    }

    const title = json.result?.title || 'video';
    const videoUrl = json.result.download.url;
    const safeTitle = title.replace(/[\\/:*?"<>|]/g, '');

    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: `*${dev}*`,
      fileName: `${safeTitle}.mp4`,
      mimetype: 'video/mp4',
    }, { quoted: m });

    // Reacción Buena :D
    await m.react('✅');

  } catch (e) {
    console.error(e);
    await m.react('❌');
    return m.reply(`❌ Error: ${e.message || 'Falló la descarga del video.'}`);
  }
};

handler.command = ['ytmp4'];
handler.help = ['ytmp4 <enlace>'];
handler.tags = ['downloader'];
export default handler;
