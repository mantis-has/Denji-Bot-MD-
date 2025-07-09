/* 
- Earthquake Alert By Jose XrL 
- Powered By Team Dark Core 
- Free Codes Titans 
- https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S
*/

// *🌎 [ Earthquake Information ]*

import fetch from 'node-fetch';

let Jose = async (m, { conn, args, text, usedPrefix, command }) => {
  try {
    const response = await fetch("https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json");
    const data = (await response.json()).Infogempa.gempa;

    const message = `
⚠️ *Alerta de Terremoto* ⚠️

📍 *Ubicación:* ${data.Wilayah}

📅 *Fecha:* ${data.Tanggal}
⏰ *Hora:* ${data.Jam}
🚨 *Impacto Potencial:* ${data.Potensi}

📊 *Detalles:*
• Magnitud: ${data.Magnitude}
• Profundidad: ${data.Kedalaman}
• Coordenadas: ${data.Coordinates}
${data.Dirasakan.length > 3 ? `• Sentido: ${data.Dirasakan}` : ''}

Mantente a salvo y informado! 🌍

> 🚩 Powered by Jose XrL 
    `;

    await conn.sendMessage(m.chat, {
      text: message,
      contextInfo: {
        externalAdReply: {
          title: 'Información sobre Terremotos',
          body: dev,
          showAdAttribution: true,
          mediaType: 1,
          sourceUrl: '',
          thumbnailUrl: 'https://data.bmkg.go.id/DataMKG/TEWS/' + data.Shakemap,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    await m.reply('Error en la característica. 💔');
  }
};

Jose.help = ['terremoto'];
Jose.tags = ['internet'];
Jose.command = ["terremoto"];

export default Jose;