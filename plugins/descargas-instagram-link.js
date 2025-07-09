
import axios from 'axios'

let handler = async (m, { conn, args, usedPrefix, command, text }) => {
    if (!text) return conn.reply(m.chat, `${emoji} Ingresa el enlace de Instagram\n\nEjemplo: ${usedPrefix}${command} https://www.instagram.com/p/xxxxx`, m)

    if (!text.includes('instagram.com')) {
        return conn.reply(m.chat, '❌ Por favor ingresa un enlace válido de Instagram', m)
    }

    await m.react('🕒')
    conn.reply(m.chat, '✧ *Descargando contenido de Instagram...*', m)

    try {
        const response = await axios.get(`https://api.saveig.app/api/v1/redirection?url=${encodeURIComponent(text)}`)
        
        if (!response.data.data) return conn.reply(m.chat, '❌ No se pudo obtener el contenido', m)

        const data = response.data.data

        let caption = `❀ *Instagram Download*
👤 *Usuario:* ${data.username || 'Desconocido'}
📝 *Descripción:* ${data.caption ? data.caption.substring(0, 100) + '...' : 'Sin descripción'}`

        // Si es video
        if (data.video_url) {
            await conn.sendFile(m.chat, data.video_url, 'instagram.mp4', caption, m, null, {
                asDocument: false,
                mimetype: 'video/mp4'
            })
        }
        // Si son imágenes
        else if (data.image_url) {
            if (Array.isArray(data.image_url)) {
                // Múltiples imágenes
                for (let i = 0; i < data.image_url.length; i++) {
                    await conn.sendFile(m.chat, data.image_url[i], `instagram_${i + 1}.jpg`, `${caption}\n📸 Imagen ${i + 1}/${data.image_url.length}`, m)
                    if (i < data.image_url.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000))
                    }
                }
            } else {
                // Una sola imagen
                await conn.sendFile(m.chat, data.image_url, 'instagram.jpg', caption, m)
            }
        }

        await m.react('✅')

    } catch (error) {
        await m.react('❌')
        conn.reply(m.chat, `❌ Error al descargar: ${error.message}`, m)
    }
}

handler.help = ['instagram <link>']
handler.tags = ['descargas']
handler.command = ['instagram', 'ig', 'igdl']
handler.coin = 3
handler.group = true
handler.register = true

export default handler
