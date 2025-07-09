const handler = async (m, { conn }) => {
    const userNumber = m.sender; // Número completo, ejemplo: 51921826291@s.whatsapp.net
    await conn.sendMessage(
        m.chat,
        { text: `Tu número es:\n${userNumber}\n\nSolo la parte antes de @ es: ${userNumber.split('@')[0]}` },
        { quoted: m }
    );
};

handler.help = ['quiensoy'];
handler.tags = ['info'];
handler.command = /^quiensoy$/i;

export default handler;
