import fetch from 'node-fetch';

var handler = async (m, { conn }) => {
    const tiktokRegex = /(?:https?:\/\/)?(?:www\.)?(tiktok\.com\/@[\w.-]+\/video\/\d+|vm\.tiktok\.com\/\w+)/i;
    const match = m.text.match(tiktokRegex);

    if (!match) return;

    const url = match[0];
    const emoji = '🌸'; // Puedes personalizar esto

    try {
        await conn.reply(m.chat, `${emoji} Espere un momento, estoy descargando su video...`, m);

        const tiktokData = await tiktokdl(url);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.play) {
            return conn.reply(m.chat, "Error: No se pudo obtener el video.", m);
        }

        const videoURL = tiktokData.data.play;

        if (videoURL) {
            await conn.sendFile(m.chat, videoURL, "tiktok.mp4", `${emoji} Aquí tienes ฅ^•ﻌ•^ฅ`, m);
        } else {
            return conn.reply(m.chat, "No se pudo descargar.", m);
        }
    } catch (error1) {
        return conn.reply(m.chat, `Error: ${error1.message}`, m);
    }
};

handler.customPrefix = /https?:\/\/(www\.)?(tiktok\.com|vm\.tiktok\.com)\//i;
handler.command = new RegExp;
handler.group = true;
handler.register = false;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`;
    let response = await (await fetch(tikwm)).json();
    return response;
}
