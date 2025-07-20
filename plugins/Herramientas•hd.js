// Código creado por Sebas Arlonoac

//Comando de HD mrd 

import sharp from 'sharp';

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted;
  if (!q) {
    return m.reply(`*[ ⚠️ ] Uso*\n${usedPrefix + command} <responde a una imagen>\n\n*nigga*`);
  }

  let mime = (q.msg || q).mimetype || '';

  if (!mime.startsWith('image/')) {
    return m.reply(`*[ ⚠️ ] Uso*\n${usedPrefix + command} <responde a una imagen>\n\n*nigga*`);
  }
  try {
 
    let media = await q.download();
    console.log('Imagen descargada exitosamente.');

  
    const image = sharp(media);

    // Obtener metadatos de la imagen
    const metadata = await image.metadata();

   
    const newWidth = metadata.width * 4;
    const newHeight = metadata.height * 4;

    image.resize(newWidth, newHeight);


    image.sharpen();

 
    const buffer = await image.jpeg({ quality: 80 }).toBuffer();


    conn.sendFile(m.chat, buffer, 'imagen_mejorada.jpg', 'Aquí está tu foto en HD', m);
    console.log('Imagen mejorada enviada al usuario.');
  } catch (error) {
    console.error('Error al mejorar la imagen:', error);
    m.reply('No se pudo mejorar la imagen.');
  }
};

handler.help = ['hade <responde a una imagen>'];
handler.tags = ['herramientas'];
handler.command = /^(hade|hd|redmi2)$/i;

export default handler;