//* Código creado por Félix, no quites créditos *//

import fs from 'fs';
import fetch from 'node-fetch';
import { xpRange } from '../lib/levelling.js';
import { promises } from 'fs';
import { join } from 'path';

// Objeto global para almacenar el banner y el nombre por sesión
global.bannerUrls = {}; // Almacenará las URLs de los banners por sesión
global.botNames = {};   // Almacenará los nombres personalizados por sesión

let handler = async (m, { conn, usedPrefix, text, command }) => {
  try {
    // Inicialización del banner y el nombre por sesión si no existen
    if (!global.bannerUrls[conn.user.jid]) {
      global.bannerUrls[conn.user.jid] = 'https://qu.ax/falyP.jpg'; // URL inicial de la imagen del menú
    }
    if (!global.botNames[conn.user.jid]) {
      global.botNames[conn.user.jid] = '𝗗𝗲𝗻𝗷𝗶'; // Nombre inicial del bot
    }

    // Verificar si el usuario es el socket activo
    const isSocketActive = conn.user.jid === m.sender;

    // Comando para cambiar el banner (solo permitido para el socket activo)
    if (command === 'setbanner') {
      if (!isSocketActive) {
        return await m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      }
      if (!text) {
        return await m.reply('✘ Por favor, proporciona un enlace válido para la nueva imagen del banner.', m);
      }
      global.bannerUrls[conn.user.jid] = text.trim(); // Actualiza el banner solo para esta sesión
      return await m.reply('「🩵」El banner fue actualizado con éxito...', m);
    }

    // Comando para cambiar el nombre del bot (solo permitido para el socket activo)
    if (command === 'setname') {
      if (!isSocketActive) {
        return await m.reply('「🩵」Este comando solo puede ser usado por el socket.', m);
      }
      if (!text) {
        return await m.reply('「🩵」¿Qué nombre deseas agregar al socket?', m);
      }
      global.botNames[conn.user.jid] = text.trim(); // Actualiza el nombre solo para esta sesión
      return await m.reply('「🩵」El nombre fue actualizado con éxito...', m);
    }

    // Comandos para el menú y "CARGANDO COMANDOS" (pueden ser usados por cualquier usuario)
    if (command === 'menujuegos' || command === 'helpjuegos' || command === 'menújuegos') {
      // Variables para el contexto del canal
      const dev = 'Félix Manuel';
      const redes = 'https://github.com/Andresv27728/2.0';
      const channelRD = { id: "120363402362088282@newsletter", name: "━━━───✰──━━━─" };
      let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
      let perfil = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://qu.ax/ifPGY.jpg');

      // Mensaje de "CARGANDO COMANDOS..." con contexto de canal y respondiendo al mensaje
      await conn.sendMessage(m.chat, {
        text: 'ꪹ͜🕑͡ 𝗘𝗝𝗘𝗖𝗨𝗧𝗔𝗡𝗗𝗢 𝗘𝗟 𝗠𝗘𝗡𝗨 𝗗𝗘 𝗝𝗨𝗘𝗚𝗢𝗦...𓏲⚙️੭',
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            newsletterName: channelRD.name,
            serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: 'El poder de Denji',
            body: dev,
            thumbnailUrl: perfil,
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      }, { quoted: m });

      // Datos usuario y menú
      let { exp, chocolates, level, role } = global.db.data.users[m.sender];
      let { min, xp, max } = xpRange(level, global.multiplier);
      let nombre = await conn.getName(m.sender);
      let _uptime = process.uptime() * 1000;
      let _muptime;
      if (process.send) {
        process.send('uptime');
        _muptime = await new Promise(resolve => {
          process.once('message', resolve);
          setTimeout(resolve, 1000);
        }) * 1000;
      }
      let muptime = clockString(_muptime);
      let uptime = clockString(_uptime);
      let totalreg = Object.keys(global.db.data.users).length;
      let taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
      const emojis = '🩵';
      const error = '❌';

      let botname = global.botNames[conn.user.jid]; // Nombre del bot específico para esta sesión
      let menu = `¡Hola! ${taguser} Soy ${botname}, Este es el menú de juegos:

╭ׅׄ̇─ׅ̻ׄ╮۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹۪̇߭︹ׅ̟ׄ̇︹ׅ۪ׄ̇߭︹ׅ̟ׄ̇⊹
├ׁ̟̇     「 JUEGOS 」 
╰━─━─━─≪≪✠≫≫─━─━╯


╭̷ׄ┄̵̷ׅ۪۪۪ٜ─̶̸ׄ─̵̷ׅ─̵̷ׄ┈̶̸ׅ۪۪۪۪۪۪ٜ┈̵̷ׄ┈̵̸ׅ┈̶̸ׄ┈̵̷ׅ۪۪۪۪ٜ┈̵̷ׄ┈̶̸ׅ┈̵̷ׄ┈̵̷ׅ۪۪۪۪۪ٜ┈̶̸ׄ┈̵̷ׅ─̵̷ׄ─̶̸ׅ۪۪ٜ─̵̷ׄ┈̵̷ׅ╮
│•ꪶᳱꫂ .abrazar 
│•ꪶᳱꫂ .acertijo 
│•ꪶᳱꫂ .agarrar 
│•ꪶᳱꫂ .ahorcado 
│•ꪶᳱꫂ .besar 
│•ꪶᳱꫂ .acariciar 
│•ꪶᳱꫂ .golpear 
│•ꪶᳱꫂ .pregunta 
│•ꪶᳱꫂ .reto
│•ꪶᳱꫂ .triste 
│•ꪶᳱꫂ .reto
│•ꪶᳱꫂ .bot
│•ꪶᳱꫂ .love 
│•ꪶᳱꫂ .consejo 
│•ꪶᳱꫂ .dance 
│•ꪶᳱꫂ .nombreninja
│•ꪶᳱꫂ .meme
│•ꪶᳱꫂ .dormir 
│•ꪶᳱꫂ .rata
│•ꪶᳱꫂ .enamorada
│•ꪶᳱꫂ .gay
│•ꪶᳱꫂ .manco
│•ꪶᳱꫂ .manca
│•ꪶᳱꫂ .apostar 
│•ꪶᳱꫂ .piropo 
│•ꪶᳱꫂ .sonrojarse 
│•ꪶᳱꫂ .agarrar 
╰╌┈─━╌─━╌⃨╼⃛⬥⬥⃛╾⃨╌━─╌━─┈╌╯

> 𐃙 Powered by Félix Manuel`.trim(); // El resto del menú permanece igual

      // Enviar el menú con el banner y nombre específico para esta sesión y respondiendo al mensaje
      await conn.sendMessage(m.chat, {
        image: { url: global.bannerUrls[conn.user.jid] },
        caption: menu,
        contextInfo: {
          mentionedJid: [m.sender],
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: channelRD.id,
            newsletterName: channelRD.name,
            serverMessageId: -1,
          },
          forwardingScore: 999,
          externalAdReply: {
            title: '𝐃𝐞𝐧𝐣𝐢 𝐁o͟T͎ 𝙼𝙳',
            body: dev,
            thumbnailUrl: perfil,
            sourceUrl: redes,
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        }
      }, { quoted: m });

      await m.react(emojis);
    }

  } catch (e) {
    await m.reply(`✘ Ocurrió un error cuando la lista de comandos se iba a enviar.\n\n${e}`, m);
    await m.react(error);
  }
};

handler.help = ['menu', 'setbanner', 'setname'];
handler.tags = ['main'];
handler.command = ['menujuegos'];
handler.register = true;

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000);
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60;
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}

export default handler;