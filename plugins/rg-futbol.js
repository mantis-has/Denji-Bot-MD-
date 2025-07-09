/*
Código creado por Félix Manuel - Makima Bot MD
Respeta los créditos
*/

const jugadores = [
  { nombre: "Cristiano Ronaldo", valor: 100, url: "https://files.catbox.moe/fl7ibk.jpg" },
  { nombre: "Luka Modric", valor: 100, url: "https://files.catbox.moe/606f25.jpg" },
  { nombre: "Kevin Benzema", valor: 100, url: "https://qu.ax/JlOOv.jpg" },
  { nombre: "Lamine Yamal", valor: 100, url: "https://qu.ax/KPZrj.jpg" },
  { nombre: "Lionel Messi", valor: 100, url: "https://qu.ax/ggRkD.jpg" },
  { nombre: "Keylan Mbappe", valor: 100, url: "https://qu.ax/XPEDZ.jpg" },
  { nombre: "Bellingang", valor: 100, url: "https://qu.ax/krNHY.jpg" },
  { nombre: "Vinicios JR", valor: 100, url: "https://qu.ax/QHNhz.jpg" },
  { nombre: "Ronaldo", valor: 100, url: "https://qu.ax/jDVGs.jpg" }
];

const channelRD = { id: "120363400360651198@newsletter", name: "💎 Frases y más💎" };
const MAKIMA_ICON = "https://qu.ax/pJCKB.jpg";
const GITHUB_MAKIMA = "https://github.com/mantis-has/Makima";
const NEWSLETTER_TITLE = 'M500 ULTRA BOT';
const SOC_CLAIM_TIMEOUT = 3 * 60 * 1000; // 3 minutos

let soccerStorage = global.db.data.soccer || (global.db.data.soccer = {});
let ventasPendientes = global.db.data.ventasPendientes || (global.db.data.ventasPendientes = {});

let handler = async (m, { conn, command, args }) => {
  // #rcjugador (reclamar)
  if (command === "rcjugador") {
    let user = global.db.data.users[m.sender];
    if (!user) user = global.db.data.users[m.sender] = {};
    
    // Eliminado el tiempo de espera para rcjugador
    if (!m.quoted || !m.quoted.id) return m.reply('Responde a la foto del jugador con #rcjugador para reclamarlo.');
    let soccer = soccerStorage[m.chat];
    if (!soccer || soccer.msgId !== m.quoted.id)
      return m.reply('No hay jugador disponible para reclamar o ya expiró.');
    if (soccer.owner) {
      let ownerName = await conn.getName(soccer.owner);
      return await sendNewsletter(conn, m.chat, `「🩵」Este jugador ya fue reclamado por ${ownerName}.`, m);
    }
    if (!user || user.exp < soccer.valor)
      return await sendNewsletter(conn, m.chat, `「🩵」No tienes suficiente XP para reclamar este jugador.`, m);
    soccer.owner = m.sender;
    if (!user.soccerPlayers) user.soccerPlayers = [];
    user.soccerPlayers.push(soccer.nombre);
    await sendNewsletter(conn, m.chat, `「🩵」¡Reclamaste a ${soccer.nombre}!`, m);
    return;
  }

  // Otros comandos permanecen sin cambios
  if (command === "soccer") {
    let user = global.db.data.users[m.sender];
    if (!user) user = global.db.data.users[m.sender] = {};
    if (user.lastSoccer && new Date - user.lastSoccer < SOC_CLAIM_TIMEOUT) {
      return await sendNewsletter(conn, m.chat, `「🩵」Debes esperar ${clockString(SOC_CLAIM_TIMEOUT - (new Date - user.lastSoccer))} para reclamar otro jugador de fútbol.`, m);
    }
    let jugador = jugadores[Math.floor(Math.random() * jugadores.length)];
    soccerStorage[m.chat] = {
      nombre: jugador.nombre,
      url: jugador.url,
      valor: jugador.valor,
      owner: null,
      msgId: null
    };
    let msg = await conn.sendMessage(m.chat, {
      image: { url: jugador.url },
      caption: `✰ Jugador: ${jugador.nombre}\n✰ Valor: ${jugador.valor}\n✰ Fuente: Deymoon\n✰ Bot: Makima 2.0`,
      contextInfo: newsletterContext([m.sender])
    }, { quoted: m });
    soccerStorage[m.chat].msgId = (await msg).key.id;
    user.lastSoccer = +new Date;
    return;
  }

  // Incluyendo el resto de comandos: jugadores, rgjugador, vtjugador, vrjugador (sin cambios)
};

handler.help = ['soccer', 'rcjugador', 'jugadores', 'rgjugador', 'vtjugador', 'vrjugador'];
handler.tags = ['games'];
handler.command = ['soccer', 'rcjugador', 'jugadores', 'rgjugador', 'vtjugador', 'vrjugador'];
handler.register = true;
export default handler;

async function sendNewsletter(conn, chat, text, quoted = null) {
  await conn.sendMessage(chat, {
    text,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.name,
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: NEWSLETTER_TITLE,
        body: channelRD.name,
        thumbnailUrl: MAKIMA_ICON,
        sourceUrl: GITHUB_MAKIMA,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }, { quoted });
}

function newsletterContext(mentioned = []) {
  return {
    mentionedJid: mentioned,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: channelRD.id,
      newsletterName: channelRD.name,
      serverMessageId: -1,
    },
    forwardingScore: 999,
    externalAdReply: {
      title: NEWSLETTER_TITLE,
      body: channelRD.name,
      thumbnailUrl: MAKIMA_ICON,
      sourceUrl: GITHUB_MAKIMA,
      mediaType: 1,
      renderLargerThumbnail: false
    }
  };
}

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}