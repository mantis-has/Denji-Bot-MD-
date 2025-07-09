/* 
- Downloader SnackVideo By Jose XrL
- Power By Team Code Titans
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S 
*/
// *🍁 [ SnackVideo Downloader ]*

import axios from 'axios';

let handler = async (m, { conn, args }) => {
    
    if (!args[0]) {
        
        return conn.reply(m.chat, `[ ✰ ]  Ingresa un enlace de SnackVideo. Ejemplo: *https://s.snackvideo.com/p/dwlMd51U*`, m, rcanal);
    }
    
    
    if (!args[0].match(/snackvideo/gi)) {
        return conn.reply(m.chat, `[ ✰ ]  Verifica que el enlace sea de *SnackVideo*`, m, rcanal);
    }
    
    await m.react('🕓');
    try {

        const response = await axios.get(`https://api.siputzx.my.id/api/d/snackvideo?url=${encodeURIComponent(args[0])}`);
        const data = response.data;

        if (data.status) {
            const { 
                videoUrl, 
                title, 
                description, 
                creator, 
                interaction 
            } = data.data;

            
            const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });

            const message = `🏷️ *Título*: ${title}\n` +
                            `📝 *Descripción*: ${description}\n` +
                            `👤 *Creador*: [${creator.name}](${creator.profileUrl})\n` +
                            `❤️ *Likes*: ${interaction.likes}\n` +
                            `👁️ *Vistas*: ${interaction.views}\n` +
                            `🔗 *Enlace Original*: ${data.data.url}\n`;


            await conn.sendFile(m.chat, videoResponse.data, 'video.mp4', message, m, { quoted: m });
            await m.react('✅');
        } else {
            await conn.reply(m.chat, `[ ✰ ]  Ocurrió un error: ${data.data}`, m);
            await m.react('✖️');
        }
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, `[ ✰ ]  Ocurrió un error al procesar tu solicitud.`, m);
        await m.react('✖️');
    }
};

handler.help = ['snackvideodownload *<url>*'];
handler.tags = ['downloader'];
handler.command = ['snackvideodownload', 'dlsnackvideo'];
handler.register = true;

export default handler;