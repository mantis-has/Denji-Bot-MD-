//código creado x Félix Manuel 
//Porfavor deja los créditos 

let handler = async (m, { conn, args, participants }) => {
    let users = Object.entries(global.db.data.users).map(([key, value]) => ({
        ...value,
        jid: key
    }));

    let sortedLevel = users.sort((a, b) => (b.exp || 0) - (a.exp || 0));
    let page = Math.max(1, parseInt(args[0])) || 1;
    let pageSize = 10;
    let startIndex = (page - 1) * pageSize;
    let endIndex = startIndex + pageSize;
    let totalPages = Math.ceil(sortedLevel.length / pageSize);

    let usersPage = sortedLevel.slice(startIndex, endIndex);

    // Obtener nombres correctamente
    let names = await Promise.all(usersPage.map(async u => {
        try {
            return await conn.getName(u.jid);
        } catch (e) {
            return 'Usuario';
        }
    }));

    let text = `╭══ 𝐓𝐎𝐏 𝐔𝐒𝐔𝐀𝐑𝐈𝐎𝐒 ══╮\n│\n`;

    text += usersPage.map((user, i) => {
        let index = startIndex + i + 1;
        let name = participants.some(p => user.jid === p.jid) ? `${names[i]} wa.me/${user.jid.split('@')[0]}` : `@${user.jid.split('@')[0]}`;
        return `│ ✰ ${index}. *${name}*\n│    ├ ✨ XP: *${user.exp || 0}*\n│    ├ 🎖 Nivel: *${user.level || 0}*\n│    └ Diamantss 💎: *${user.money || 0}*`;
    }).join('\n│\n');

    text += `\n╰════ 📄 Página *${page}* de *${totalPages}* ════╯`;
    if (page < totalPages) text += `\n\n→  Usa *#lb ${page + 1}* para la siguiente página`;

    await conn.reply(m.chat, text.trim(), m, {
        mentions: conn.parseMention(text)
    });
}

handler.help = ['lb'];
handler.tags = ['rpg'];
handler.command = ['lboard', 'top', 'lb'];
handler.group = true;
handler.register = true;
handler.fail = null;
handler.exp = 0;

export default handler;
