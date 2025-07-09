
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) return m.reply(`📸 *Uso:* ${usedPrefix + command} <url_instagram>\n\n*Ejemplo:* ${usedPrefix + command} https://instagram.com/p/POST_ID`);
  
  if (!/instagram\.com/i.test(args[0])) {
    return m.reply('❌ URL de Instagram inválida');
  }

  m.react('⏳');
  
  try {
    // API de Instagram downloader
    let response = await fetch(`https://api.downloadgram.com/media?url=${encodeURIComponent(args[0])}`);
    let data = await response.json();
    
    if (!data.media || data.media.length === 0) throw new Error('No se encontró contenido');

    let caption = `📸 *DESCARGA INSTAGRAM*\n\n`;
    caption += `📝 *Descripción:* ${data.caption || 'Sin descripción'}\n`;
    caption += `👤 *Usuario:* ${data.username || 'Desconocido'}\n`;
    caption += `📅 *Fecha:* ${data.timestamp || 'N/A'}\n`;
    caption += `🔗 *URL:* ${args[0]}`;

    // Enviar cada medio (puede ser múltiple en carrusel)
    for (let i = 0; i < data.media.length; i++) {
      let media = data.media[i];
      
      if (media.type === 'video') {
        await conn.sendMessage(m.chat, {
          video: { url: media.url },
          caption: i === 0 ? caption : `📸 *Parte ${i + 1}/${data.media.length}*`
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, {
          image: { url: media.url },
          caption: i === 0 ? caption : `📸 *Parte ${i + 1}/${data.media.length}*`
        }, { quoted: m });
      }
      
      // Pausa entre envíos múltiples
      if (i < data.media.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    m.react('✅');
    
  } catch (error) {
    m.react('❌');
    m.reply(`❌ Error: ${error.message}`);
  }
};

handler.help = ['instagram', 'ig', 'igdl'];
handler.tags = ['downloader'];
handler.command = /^(instagram|ig|igdl)$/i;
handler.limit = true;

export default handler;
