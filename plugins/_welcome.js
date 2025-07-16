//© código creado por Deylin 
//https://github.com/deylinqff
//➤  no quites creditos 

import { WAMessageStubType } from '@whiskeysockets/baileys'

const paises = {
  "1": "🇺🇸 Estados Unidos",
  "34": "🇪🇸 España",
  "52": "🇲🇽 México",
  "54": "🇦🇷 Argentina",
  "55": "🇧🇷 Brasil",
  "56": "🇨🇱 Chile",
  "57": "🇨🇴 Colombia",
  "58": "🇻🇪 Venezuela",
  "591": "🇧🇴 Bolivia",
  "593": "🇪🇨 Ecuador",
  "595": "🇵🇾 Paraguay",
  "598": "🇺🇾 Uruguay",
  "502": "🇬🇹 Guatemala",
  "503": "🇸🇻 El Salvador",
  "504": "🇭🇳 Honduras",
  "505": "🇳🇮 Nicaragua",
  "506": "🇨🇷 Costa Rica",
  "507": "🇵🇦 Panamá",
  "51": "🇵🇪 Perú",
  "53": "🇨🇺 Cuba",
  "91": "🇮🇳 India"
};

function obtenerPais(numero) {
  let num = numero.replace("@s.whatsapp.net", "");
  let codigo = Object.keys(paises).find(pref => num.startsWith(pref));
  return paises[codigo] || "🌐 Desconocido";
}

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return;
  if (m.chat === "120363416711925079@g.us") return;

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split("@")[0]}`;
  let chat = global.db.data.chats[m.chat];
  let totalMembers = participants.length;
  let date = new Date().toLocaleString("es-ES", { timeZone: "America/Mexico_City" });

  let pais = obtenerPais(who);

  let frasesBienvenida = [
    "Disfruta tu estadia en este grupo.",
    "Espero y leas la descripción.",
    "Diviértete y participa en las conversaciones.",
    "¡Un placer tenerte aquí!",
    "¡Bienvenido! Esperamos que la pases genial con nosotros.",
  ];
  let frasesDespedida = [
    "Esperamos verte pronto de nuevo.",
    "¡Suerte en tus proyectos futuros!",
    "Hasta la próxima, cuídate.",
    "Nos vemos en otra ocasión.",
    "¡Fue un placer tenerte aquí! Mucho gusto.",
  ];

  let fraseRandomBienvenida = frasesBienvenida[Math.floor(Math.random() * frasesBienvenida.length)];
  let fraseRandomDespedida = frasesDespedida[Math.floor(Math.random() * frasesDespedida.length)];

  let imagenUrl = 'https://qu.ax/dYhOj.jpg';

  if (chat.welcome) {
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `
*━━━─────━━━─── 「 ✰BIENVENIDO✰ 」
━━━─────━━━───*
╭─➪「 ✐ ${taguser}  」
│ 𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼  𝗮 ${groupMetadata.subject}
│Miembros: ${totalMembers + 1}
│Soy Denji-Bot el bot tuyo 
│y de todos.
╰─━━━─────━━━─
*${fraseRandomBienvenida}*
      `.trim();

      await conn.sendMessage(m.chat, {
        image: { url: imagenUrl },
        caption: bienvenida,
        mentions: [who]
      });
    }

    if (
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE
    ) {
      let despedida = `
*━━━─────━━━─── 
「 ✰     𝐀𝐃𝐈𝐎𝐒     ✰ 」
━━━─────━━━───*
╭─➪「 ✐ ${taguser} 」
│ Grupo: ${groupMetadata.subject}
│Ahora somos ${totalMembers + 1} miembros
╰─━━━─────━━━─
*${fraseRandomDespedida}*
      `.trim();

      await conn.sendMessage(m.chat, {
        image: { url: imagenUrl },
        caption: despedida,
        mentions: [who]
      });
    }
  }
}
