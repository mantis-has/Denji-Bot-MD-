
import axios from 'axios';

let handler = async (m, { conn, args }) => {
    if (!args[0]) return conn.reply(m.chat, `[ 🧸 ]  Ingresa un link de CapCut`, m, rcanal);
    if (!args[0].match(/capcut/gi)) return conn.reply(m.chat, `[ ✰ ]  Verifica que el link sea de *CapCut*`, m, rcanal);

    await m.react('🕓');
    try {
        const apiKey = 'freekey';
        const url = args[0];
        const apiUrl = `https://api.arixoffc.com/api/dl/capcut?apikey=${apiKey}&url=${encodeURIComponent(url)}`;
        
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (data) {
            const title = data.title;
            const videoUrl = data.videoUrl;
            const posterUrl = data.posterUrl;

            const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
            await conn.sendFile(m.chat, videoResponse.data, 'video.mp4', `Aquí tienes tu video de CapCut: ${title}`, m);
            await m.react('✅');
        } else {
            await conn.reply(m.chat, `[ ✰ ]  Ocurrió un error: No se pudo obtener datos del video.`, m);
            await m.react('✖️');
        }
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `[ ✰ ]  Ocurrió un error al procesar tu solicitud.`, m);
        await m.react('✖️');
    }
};

handler.help = ['capcutdownload *<url cc>*'];
handler.tags = ['downloader'];
handler.command = ['capcut', 'ccdownload'];
handler.register = true;

export default handler;
