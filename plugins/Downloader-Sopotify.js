import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
    if (!text) {
        return conn.reply(m.chat, '🫕 Ingresa el enlace de algún Track, Playlist o Álbum de Spotify.', m, rcanal);
    }

    let isSpotifyUrl = text.match(/^(https:\/\/open\.spotify\.com\/(album|track|playlist)\/[a-zA-Z0-9]+)/i);
    if (!isSpotifyUrl) {
        return conn.reply(m.chat, '🚩 Ingresa un enlace válido de Track, Playlist o Álbum de Spotify.', m);
    }

    await m.react('🕓');

    try {
        const spotdr = await fetch('https://fastrestapis.fasturl.cloud/downup/spotifydown?url=' + encodeURIComponent(text));
        const spotdl = (await spotdr.json()).result;

        let img = await (await fetch(spotdl.metadata.cover)).buffer();
        
        let txt = `*乂  S P O T I F Y  -  D O W N L O A D*\n\n`;
        txt += `    ✩  *Título* : ${spotdl.metadata.title}\n`;
        txt += `    ✩  *Artista* : ${spotdl.metadata.artist}\n`;
        txt += `    ✩  *Álbum* : ${spotdl.metadata.album}\n`;
        txt += `    ✩  *Lanzamiento* : ${spotdl.metadata.releaseDate}\n\n`;
        txt += `*- ↻ Los audios se están enviando, espera un momento...*`;

        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, rcanal);
        await conn.sendMessage(m.chat, { audio: { url: spotdl.link }, fileName: `${spotdl.metadata.title}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });
        
        await m.react('✅');
    } catch (error) {
        console.error('Error al procesar la descarga de Spotify:', error);
        await m.react('✖️');
    }
};

handler.help = ['spotifydl'];
handler.tags = ['downloader'];
handler.command = /^(spotify|sp|Spotify|spotifydl)$/i;
handler.register = true;

export default handler;