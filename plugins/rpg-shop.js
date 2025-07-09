const xppercoin = 350;
//código adaptado por GitHub Copilot Chat Assistant, créditos originales: Félix Manuel

const handler = async (m, {conn, command, args}) => {
  let count = command.replace(/^buy/i, '');
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xppercoin) : parseInt(count) : args[0] ? parseInt(args[0]) : 1;
  count = Math.max(1, count);
  if (global.db.data.users[m.sender].exp >= xppercoin * count) {
    global.db.data.users[m.sender].exp -= xppercoin * count;
    global.db.data.users[m.sender].coin += count;

    // ------- CANAL/NEWSLETTER CONTEXT ---------
    const channelRD = { 
      id: "120363400360651198@newsletter", // <-- Cambia por tu canal/newsletter ID
      name: "MAKIMA CHANNEL"              // <-- Cambia por el nombre de tu canal/newsletter
    }
    let recibo = `
╔═══════⩽✰⩾═══════╗
║    𝐍𝐨𝐭𝐚 𝐃𝐞 𝐏𝐚𝐠𝐨 
╠═══════⩽✰⩾═══════╝
║╭──────────────┄
║│ *Compra Nominal* : + ${count} 💎
║│ *Gastado* : -${xppercoin * count} Exp ✨
║╰──────────────┄
╚═══════⩽✰⩾═══════╝`.trim();

    await conn.sendMessage(m.chat, {
      text: recibo,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: channelRD.id,
          newsletterName: channelRD.name,
          serverMessageId: -1,
        },
        externalAdReply: {
          title: channelRD.name,
          body: 'MAKIMA 2.0 BOT',
          thumbnailUrl: 'https://qu.ax/tqWBN.jpg', // Cambia si quieres
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
        }
      }
    }, { quoted: m })

  } else {
    const moneda = 'Diamantes'
    const emoji2 = '❌'
    await conn.reply(m.chat, `${emoji2} Lo siento, no tienes suficiente *XP* para comprar *${count}* ${moneda} 💎`, m);
  }
};

handler.help = ['buy', 'buyall'];
handler.tags = ['economy'];
handler.command = ['buy', 'buyall'];
handler.group = true;
handler.register = true;

export default handler;