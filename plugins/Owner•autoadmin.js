const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply('🔥 *Ahora eres admin.*');
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  await m.react(done)
   m.reply('Listo Mi señor.');
    let nn = conn.getName(m.sender);
     conn.reply('18293142989@s.whatsapp.net', `🔥 *${nn}* se dio Auto Admin en:\n${groupMetadata.subject}.`, m, rcanal, );
  } catch {
    m.reply('💥 Ocurrio un error.');
  }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
