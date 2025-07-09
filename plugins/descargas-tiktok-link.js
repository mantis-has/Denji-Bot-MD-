
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Ingresa el enlace de TikTok\n\nEjemplo: ${usedPrefix}${command} https://vm.tiktok.com/xxxxx`, m)

    if (!text.includes('tiktok.com') && !text.includes('vm.tiktok')) {
        return conn.reply(m.chat, '❌ Por favor ingresa un enlace válido de TikTok', m)
    }

    await m.react('🕒')
    conn.reply(m.chat, '✧ *Descargando video de TikTok...*', m)

    try {
        const response = await axios({
            method: 'POST',
            url: 'https://tikwm.com/api/',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': 'current_language=en',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
            },
            data: {
                url: text,
                count: 12,
                cursor: 0,
                web: 1,
                hd: 1
            }
        })

        const result = response.data.data

        if (!result) return conn.reply(m.chat, '❌ No se pudo obtener el video', m)

        let caption = `❀ *Título:* ${result.title}
👤 *Autor:* ${result.author.nickname}
❤️ *Likes:* ${result.digg_count}
💬 *Comentarios:* ${result.comment_count}
🔄 *Compartidos:* ${result.share_count}
⏱️ *Duración:* ${result.duration}s`

        // Enviar video sin marca de agua
        await conn.sendFile(m.chat, result.hdplay || result.play, 'tiktok.mp4', caption, m, null, {
            asDocument: false,
            mimetype: 'video/mp4'
        })

        await m.react('✅')

    } catch (error) {
        await m.react('❌')
        conn.reply(m.chat, `❌ Error al descargar: ${error.message}`, m)
    }
}

handler.help = ['tiktok <link>']
handler.tags = ['descargas']
handler.command = ['tiktok', 'tt']
handler.coin = 2
handler.group = true
handler.register = true

export default handler
