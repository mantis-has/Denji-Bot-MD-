// *👂 [ iFunny Video Downloader ]*
// *By Code Titans*

import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '🚩 Ingresa la URL del video de iFunny que deseas descargar.\n\n`Ejemplo:`\n' + `> *${usedPrefix + command}* https://ifunny.co/video/sHbRld9F9?s=cl`, m, rcanal);

  await m.react('🕓');

  try {
    const response = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/Ifunny-dl?text=${encodeURIComponent(text)}`);
    
    if (response.status === 200) {
      const videoData = response.data.video;

      let txt = '`乂  I F U N N Y  -  D O W N L O A D`\n\n';
      txt += `    ✩  *Creador* : ${response.data.creator}\n`;
      txt += `    ✩  *Calidad* : ${videoData.quality}\n`;
      txt += `    ✩  *Formato* : ${videoData.format}\n\n`;
      txt += `> 🚩 Enlace al video: ${videoData.url}`;

      await conn.sendMessage(m.chat, { video: { url: videoData.url }, caption: txt }, { quoted: m });
      await m.react('✅');
    } else {
      await m.react('✖️');
      await conn.reply(m.chat, 'Error al obtener datos desde iFunny.', m);
    }
  } catch (error) {
    console.error(error);
    await m.react('✖️');
    await conn.reply(m.chat, 'Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', m);
  }
}

handler.tags = ['downloader'];
handler.help = ['ifunny *<url>*'];
handler.command = ['ifunny', 'dlifunny'];
handler.register = true;

export default handler;