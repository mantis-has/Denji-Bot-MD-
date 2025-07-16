//* Código Creado por Félix*
//*No quites Los Créditos*


const handler = async (m, { isOwner, isAdmin, conn, participants, args, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
  }

  const pesan = args.join(' ');
  const invocador = m.pushName || 'Administrador';
  const pp = 'https://qu.ax/gScos.jpg'; // Imagen para el comando 

  let teks = `╭─╮︹︹⊹︹︹⊹︹︹⊹︹︹╭─╮
  𝗜𝗡𝗩𝗢𝗖𝗔𝗡𝗗𝗢 𝗚𝗥𝗨𝗣𝗢
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

🔥 Te invocó: ${invocador}

💥 Mensaje: ${pesan ? pesan : ''}

╭─⬣「 ✰𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀✰ 」⬣\n`;
  for (const mem of participants) {
    teks += `│⁖ฺ۟̇࣪·֗٬̤⃟🥷 @${mem.id.split('@')[0]}\n`;
  }
  teks += '╰─⬣';

  // Enviar el mensaje como imagen + texto, mencionando a todos
  await conn.sendFile(m.chat, pp, 'invocando.jpg', teks, m, false, { mentions: participants.map(a => a.id) });
};

handler.help = ['tagall *<mensaje>*', 'invocar *<mensaje>*'];
handler.tags = ['grupo'];
handler.command = ['tagall', 'todos', 'mensionall', 'invocar'];
handler.admin = true;
handler.group = true;
export default handler;