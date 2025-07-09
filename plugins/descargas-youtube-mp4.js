
import { youtubedl, youtubedlv2 } from '../lib/youtubedl.js'
import yts from 'yt-search'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Ingresa el título de la canción o el enlace de YouTube\n\nEjemplo: ${usedPrefix}${command} Ozuna Criminal`, m)

    await m.react('🕒')
    conn.reply(m.chat, '✧ *Descargando video...*', m)

    try {
        let videoData
        let videoUrl = text

        // Si no es un enlace, buscar en YouTube
        if (!text.includes('youtube.com') && !text.includes('youtu.be')) {
            let search = await yts(text)
            if (!search.videos.length) return conn.reply(m.chat, '❌ No se encontraron resultados', m)
            
            videoData = search.videos[0]
            videoUrl = videoData.url
        }

        // Descargar el video
        let dl_url = await youtubedl(videoUrl).catch(async _ => await youtubedlv2(videoUrl))
        
        if (!dl_url) return conn.reply(m.chat, '❌ Error al obtener el enlace de descarga', m)

        let title = videoData?.title || dl_url.title || 'Video'
        let size = dl_url.filesizeF || 'Desconocido'
        
        let caption = `❀ *Título:* ${title}
⚡ *Tamaño:* ${size}
🎥 *Calidad:* ${dl_url.quality || 'HD'}
📱 *Formato:* MP4`

        await conn.sendFile(m.chat, dl_url.dl_url, `${title}.mp4`, caption, m, null, { 
            asDocument: false, 
            mimetype: 'video/mp4' 
        })

        await m.react('✅')

    } catch (error) {
        await m.react('❌')
        conn.reply(m.chat, `❌ Error al descargar: ${error.message}`, m)
    }
}

handler.help = ['ytmp4 <título/link>']
handler.tags = ['descargas']
handler.command = ['ytmp4', 'ytvideo']
handler.coin = 4
handler.group = true
handler.register = true

export default handler
