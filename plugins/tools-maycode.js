// Codigo de SYA TEAM 
// no quites créditos 
import axios from 'axios';

const NIGHT_API_ENDPOINTS = [
  'https://nightapioficial.onrender.com',
  'https://nightapi-2a6l.onrender.com',
  'https://nightapi.is-a.dev'
];

const API_PATH = (prompt) => `/api/maycode/models/v2/?message=${encodeURIComponent(prompt)}`;

async function fetchMayCode(prompt) {
  for (const base of NIGHT_API_ENDPOINTS) {
    try {
      const res = await axios.get(base + API_PATH(prompt));
      if (res.data?.code || res.data?.MayCode) return res.data;
    } catch (err) {
      console.warn(`[Error] ${base} → ${err.message}`);
    }
  }
  throw new Error('Todas las instancias de la API están fuera de servicio.');
}

const handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.reply(m.chat,
`📌 *Uso correcto del comando: .maycode*

🔹 Escribe tu pregunta o solicitud relacionada con código.
🔹 Recibirás una explicación y un ejemplo generado automáticamente.

✏️ *Ejemplo:*
.maycode ¿Cómo crear un input con bordes redondeados en HTML?

🧠 Modelo en uso: *MayCode v2*`, m, { ...rcanal });
  }

  // Reacción de espera
  await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

  try {
    const data = await fetchMayCode(text.trim());

    const respuestaTexto = `
📄 *Resultado generado por MayCode*

👤 *Tu solicitud:* ${data.user || text}
💬 *Explicación:* ${data.MayCode || 'No se generó una explicación.'}

💻 *Código generado a continuación...*

🧩 Fuente: *NightAPI*
👨‍💻 Desarrollado por *SoyMaycol*
> CODIGO OFC DE SYATEAM ⚔️
    `.trim();

    const codigo = data.code?.trim() || '// No se generó ningún código.';

    await conn.sendMessage(m.chat, { text: respuestaTexto }, { quoted: m, ...rcanal });
    await conn.sendMessage(m.chat, { text: codigo }, { quoted: m, ...rcanal });

    // Reacción final
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat,
`🚫 *Error al obtener una respuesta de MayCode*

🔒 Actualmente, todas las instancias de la API están fuera de servicio.

🕐 Intenta nuevamente más tarde.`, m, { ...rcanal });
  }
};

handler.help = ['maycode'];
handler.tags = ['tools'];
handler.command = ['maycode', 'codigo'];

export default handler;
