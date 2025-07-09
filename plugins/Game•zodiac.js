/*Codigo creado por Félix Manuel 
mantis-has/Makima
Este codigo usa la API de SoySapo6 */

import { sticker } from '../lib/sticker.js'
import axios from 'axios'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const fetchSticker = async (text, attempt = 1) => {
    try {
        const apiUrl = 'https://nightapi.is-a.dev/api/mayeditor'
        const fondo = 'https://files.catbox.moe/s73kf3.png' // Fondo estilo Brat

        const { data } = await axios.get(apiUrl, {
            params: {
                url: fondo,
                texto: text,
                textodireccion: 'Centro',
                fontsize: 100,
                color: 'black'
            }
        })

        if (!data?.edited_url) throw new Error('No se recibió la imagen generada.')

        const imageBuffer = await axios.get(data.edited_url, { responseType: 'arraybuffer' })
        return imageBuffer.data
    } catch (error) {
        if (error.response?.status === 429 && attempt <= 3) {
            const retryAfter = error.response.headers['retry-after'] || 5
            await delay(retryAfter * 1000)
            return fetchSticker(text, attempt + 1)
        }
        throw error
    }
}

let handler = async (m, { conn, text }) => {
    if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else if (!text) {
        return conn.sendMessage(m.chat, {
            text: `「🔥」 Responde a un mensaje o ingresa un texto para crear el Sticker estilo blanco.`,
        }, { quoted: m })
    }

    try {
        const buffer = await fetchSticker(text)
        let userId = m.sender
        let packstickers = global.db.data.users[userId] || {}
        let texto1 = packstickers.text1 || global.packsticker
        let texto2 = packstickers.text2 || global.packsticker2

        let stiker = await sticker(buffer, false, texto1, texto2)

        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
        } else {
            throw new Error("🔥 No se pudo generar el sticker.")
        }
    } catch (error) {
        return conn.sendMessage(m.chat, {
            text: `🔥 Ocurrió un error: ${error.message}`,
        }, { quoted: m })
    }
}

handler.command = ['brat']
handler.tags = ['sticker']
handler.help = ['brat *<texto>*']

export default handler