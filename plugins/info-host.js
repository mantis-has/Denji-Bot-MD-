let handler = async (m, { conn, command, usedPrefix }) => {
let txt = `✨ *L U M I N A R Y S - H O S T* 

*¿Buscas un hosting de alta calidad a precios imbatibles?*  
Descubre *Luminary's Hosting*, tu solución ideal con servidores dedicados y precios accesibles. Ofrecemos un Uptime garantizado 24/7, asegurando que tus proyectos funcionen de manera óptima en todo momento.

🌌 *Información del Host*

🔮 *Dashboard:*  
• (https://dash.luminarys.shop)

🧑‍🚀 *Panel de Control:*  
• (https://panel.luminarys.shop)

🌠 *Únete a nuestro Canal:*  
• (https://whatsapp.com/channel/0029Vb7CL7dGk1FtzTLjNt3S)

🚀 *Contacto (Soporte):*  
• (https://chat.whatsapp.com/L29DaYhqORo2wBEF95j9D3)

> *¡Únete a nuestra comunidad y disfruta de un servicio excepcional! No dejes pasar la oportunidad de llevar tus proyectos al siguiente nivel con Luminarys. ¡Estamos aquí para ayudarte! *`


await conn.sendMessage(m.chat, { text: txt,
contextInfo:{
forwardingScore: 9999999,
isForwarded: false, 
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
title: `🔵L U M I N A R Y S - H O S T🔵`,
body: `⚜️ Super Hosting 24/7 ⚜️`,
"previewType": "PHOTO",
thumbnailUrl: 'https://qu.ax/waCu.jpg', 
sourceUrl: 'https://dash.luminarys.shop'}}},
{ quoted: fkontak})
}
handler.tags =['main'] 
handler.help = ['host', 'hosting'] 
handler.command = ['host', 'olympus', 'olympushost', 'hosting']
export default handler