
const handler = async (m, { conn }) => {
  let text = `*╭─────────────────◆*\n*│    📋 LISTA DE SOPORTE*\n*╰─────────────────◆*\n\n`;
  
  // Mostrar owners primero
  text += `*👑 OWNERS:*\n`;
  let ownerCount = 1;
  for (let owner of global.owner) {
    const ownerNumber = owner[0];
    const ownerName = owner[1] || 'Owner';
    text += `*${ownerCount}.* @${ownerNumber}\n   └ *Nombre:* ${ownerName}\n\n`;
    ownerCount++;
  }
  
  // Mostrar soporte
  text += `*🛠️ EQUIPO DE SOPORTE:*\n`;
  
  if (!global.db.data.soporte || global.db.data.soporte.length === 0) {
    text += `   └ *No hay personal de soporte agregado*\n\n`;
  } else {
    let supportCount = 1;
    for (let support of global.db.data.soporte) {
      const supportNumber = support.number.replace('@s.whatsapp.net', '');
      const supportName = support.name || 'Usuario Soporte';
      const addedDate = support.addedDate ? new Date(support.addedDate).toLocaleDateString() : 'Fecha no disponible';
      
      text += `*${supportCount}.* @${supportNumber}\n`;
      text += `   ├ *Nombre:* ${supportName}\n`;
      text += `   └ *Agregado:* ${addedDate}\n\n`;
      supportCount++;
    }
  }
  
  // Footer con el nombre del bot
  text += `*╭─────────────────◆*\n`;
  text += `*│  💫 Powered by ${global.namebot}*\n`;
  text += `*╰─────────────────◆*`;
  
  // Obtener todas las menciones
  const mentions = [
    ...global.owner.map(owner => owner[0] + '@s.whatsapp.net'),
    ...(global.db.data.soporte || []).map(support => support.number)
  ];
  
  conn.reply(m.chat, text, m, { mentions });
};

handler.command = ['soporte', 'support', 'staff'];
handler.group = false;
export default handler;
