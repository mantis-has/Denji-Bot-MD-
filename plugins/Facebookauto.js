import { igdl } from 'ruhend-scraper';

const handler = async (m, { conn }) => {
    const fbRegex = /https?:\/\/(www\.)?(facebook\.com|fb\.watch)\/[^\s]+/i;
    const match = m.text.match(fbRegex);
    if (!match) return;

    const url = match[0];
    const emoji = '📘';
    const emoji2 = '⚠️';
    const rwait = '⏳';
    const done = '✅';
    const error = '❌';
    const msm = '❗';

    let res;
    try {
        await m.react(rwait);
        res = await igdl(url);
    } catch (e) {
        return conn.reply(m.chat, `${msm} Error al obtener datos. Verifica el enlace.`, m);
    }

    let result = res.data;
    if (!result || result.length === 0) {
        return conn.reply(m.chat, `${emoji2} No se encontraron resultados.`, m);
    }

    let data;
    try {
        data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
    } catch (e) {
        return conn.reply(m.chat, `${msm} Error al procesar los datos.`, m);
    }

    if (!data) {
        return conn.reply(m.chat, `${emoji2} No se encontró una resolución adecuada.`, m);
    }

    let video = data.url;
    try {
        await conn.sendMessage(
            m.chat,
            {
                video: { url: video },
                caption: `${emoji} *Aquí tienes ฅ^•ﻌ•^ฅ.*`,
                fileName: 'fb.mp4',
                mimetype: 'video/mp4'
            },
            { quoted: m }
        );
        await m.react(done);
    } catch (e) {
        await m.react(error);
        return conn.reply(m.chat, `${msm} Error al enviar el video.`, m);
    }
};

handler.customPrefix = /https?:\/\/(www\.)?(facebook\.com|fb\.watch)\//i;
handler.command = new RegExp;
handler.group = true;
handler.register = true;
handler.limit = true;

export default handler;
