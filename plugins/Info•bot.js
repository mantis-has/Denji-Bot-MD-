import fs from 'fs';
const handler = (m) => m;
handler.all = async function(m) {

const chat = global.db.data.chats[m.chat];
if (chat.isBaneed) return
if (/^bot$/i.test(m.text)) {
conn.reply(m.chat, `🩵 ¡Hola! en que puedo ayudarte hoy?\n\n✰ Usa *#menu* para ver mis comandos.`, m, rcanal, )
}
/*if (/^corin|corín|corinplus|corínplus|corinplushost|corínplushost|plus$/i.test(m.text)) {
conn.reply(m.chat, `🚀 CorinPlus Hosting ¡El plus que necesitas!\n2 *Dash:* https://dash.skyultraplus.com\n🌱 *Panel:* https://ctrl.skyultraplus.com`, m, rcanal, )
}*/
if (/^oye$/i.test(m.text)) {
conn.reply(m.chat, `¿Que quieres hijo de puta?`, m, rcanal, )
}
if (/^tetas|teta$/i.test(m.text)) {
conn.reply(m.chat, `*que caliente eres* 🥵`, m, rcanal, )
}
if (/^bug$/i.test(m.text)) {
conn.reply(m.chat, `*tu mamá we* 😹`, m, rcanal, )
}
if (/^pene$/i.test(m.text)) {
conn.reply(m.chat, `*comes* 😹`, m, rcanal, )
}
return !0;
};
export default handler;