let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    // Mensaje que se enviará cuando el comando #set sea ejecutado
    let message = `
Personalizaciones para Subbots:

> #setname
→ Cambia el nombre del bot.
> #setbanner
→ Cambia la foto del bot.

Pronto añadiremos más personalizaciones para que puedan cambiar la moneda y el welcome que quieran.

> MAKIMA PROYECT
`.trim();

    // Enviar el mensaje al chat
    await conn.sendMessage(m.chat, { text: message }, { quoted: m });
  } catch (e) {
    // En caso de error, enviar un mensaje de error
    await m.reply(`✘ Ocurrió un error al ejecutar el comando.\n\n${e}`, m);
  }
};

// Configuración del comando
handler.help = ['set'];
handler.tags = ['main'];
handler.command = ['set']; // Comando que activa esta funcionalidad
handler.register = true;

export default handler;