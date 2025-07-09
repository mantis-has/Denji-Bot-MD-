import hispamemes from 'hispamemes'
let handler = async (m, { conn, usedPrefix, command }) => {
const meme = hispamemes.meme()
conn.sendFile(m.chat, meme, '', '', fkontak)
m.react(emoji2)
}
handler.help = ['meme']
handler.tags = ['fun']
handler.command = ['meme', 'memes']
handler.coin = 1
handler.group = true;
handler.register = true

export default handler
let handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    // Obtener cantidad solicitada (máximo 100)
    let cantidad = parseInt(args[0]) || 1;
    if (cantidad > 100) cantidad = 100;
    if (cantidad < 1) cantidad = 1;

    // URLs de APIs de memes
    const memeAPIs = [
      'https://meme-api.herokuapp.com/gimme',
      'https://api.imgflip.com/get_memes',
      'https://memes.blademaker.tv/api',
      'https://api.humorapi.com/memes/random',
      'https://some-random-api.ml/meme'
    ];

    m.reply(`🎭 Buscando ${cantidad} meme${cantidad > 1 ? 's' : ''} para ti...`);
    
    // Sistema para evitar repeticiones
    let memesEnviados = [];
    let intentos = 0;
    let maxIntentos = cantidad * 3; // Máximo 3 intentos por meme solicitado

    for (let i = 0; i < cantidad && intentos < maxIntentos; i++) {
      try {
        intentos++;
        
        // Intentar obtener meme de diferentes APIs
        let memeData = null;
        
        // API 1: meme-api.herokuapp.com
        try {
          let response = await fetch('https://meme-api.herokuapp.com/gimme');
          let data = await response.json();
          if (data.url && !memesEnviados.includes(data.url)) {
            memeData = {
              url: data.url,
              title: data.title || 'Meme',
              author: data.author || 'Desconocido'
            };
          }
        } catch (e) {}

        // API 2: some-random-api si la primera falla
        if (!memeData) {
          try {
            let response = await fetch('https://some-random-api.ml/meme');
            let data = await response.json();
            if (data.image && !memesEnviados.includes(data.image)) {
              memeData = {
                url: data.image,
                title: data.caption || 'Meme',
                author: 'Random'
              };
            }
          } catch (e) {}
        }

        // Si no se pudo obtener meme único, usar memes locales predefinidos
        if (!memeData) {
          const memesLocales = [
            'https://i.imgur.com/2vM8fNZ.jpg',
            'https://i.imgur.com/3kF9sNx.jpg',
            'https://i.imgur.com/7Gf2nKm.jpg',
            'https://i.imgur.com/9Hn3vQs.jpg',
            'https://i.imgur.com/BcF8mNp.jpg',
            'https://i.imgur.com/DfT6rKl.jpg',
            'https://i.imgur.com/EhN5pQz.jpg',
            'https://i.imgur.com/FgT7nMk.jpg'
          ];
          
          let randomMeme = memesLocales[Math.floor(Math.random() * memesLocales.length)];
          if (!memesEnviados.includes(randomMeme)) {
            memeData = {
              url: randomMeme,
              title: 'Meme Local',
              author: 'Colección'
            };
          }
        }

        if (memeData && !memesEnviados.includes(memeData.url)) {
          memesEnviados.push(memeData.url);
          
          let caption = `🎭 *MEME ${i + 1}/${cantidad}*\n\n`;
          caption += `📝 *Título:* ${memeData.title}\n`;
          caption += `👤 *Autor:* ${memeData.author}\n`;
          caption += `🔗 *Fuente:* ${memeData.url.includes('imgur') ? 'Imgur' : 'Reddit/API'}`;

          await conn.sendFile(m.chat, memeData.url, 'meme.jpg', caption, m);
          
          // Pequeña pausa entre envíos para evitar spam
          if (i < cantidad - 1) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        } else {
          i--; // Restar el contador si no se encontró meme único
        }
        
      } catch (error) {
        console.error(`Error al obtener meme ${i + 1}:`, error);
        i--; // Restar el contador en caso de error
      }
    }

    if (memesEnviados.length === 0) {
      m.reply('❌ No se pudieron obtener memes en este momento. Inténtalo más tarde.');
    } else if (memesEnviados.length < cantidad) {
      m.reply(`✅ Se enviaron ${memesEnviados.length} memes de ${cantidad} solicitados (algunos podrían haberse repetido y se omitieron).`);
    }

  } catch (error) {
    console.error('Error en comando memes:', error);
    m.reply('❌ Ocurrió un error al obtener los memes.');
  }
};

handler.help = ['memes', 'meme'];
handler.tags = ['fun'];
handler.command = /^(memes?|meme)$/i;
handler.limit = true;

export default handler;
