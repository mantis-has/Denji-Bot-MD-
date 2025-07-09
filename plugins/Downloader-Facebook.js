import axios from 'axios';

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🚩 Por favor, ingresa un enlace de Facebook.', m, rcanal);
  }

  const fbUrl = args[0];
  let res;

  try {
    await m.react('💜');
    res = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/facebook?url=${fbUrl}`);
  } catch (e) {
    return conn.reply(m.chat, 'Error al obtener datos. Verifica el enlace.', m);
  }

  const result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, 'No se encontraron resultados.', m);
  }

  const videoDataHD = result.find(video => video.quality === "720p (HD)");
  const videoDataSD = result.find(video => video.quality === "360p (SD)");

  const videoUrl = videoDataHD ? videoDataHD.link_hd : videoDataSD ? videoDataSD.link_sd : null;

  if (!videoUrl) {
    return conn.reply(m.chat, 'No se encontró una resolución adecuada.', m);
  }

  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: '🍓 Aquí tienes el video.', fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m });
      await m.react('✅');
      break;
    } catch (e) {
      if (attempt === maxRetries) {
        await m.react('❌');
        return conn.reply(m.chat, 'Error al enviar el video después de varios intentos.', m);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

handler.help = ['facebook', 'fb'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb'];
handler.register = true;

export default handler;