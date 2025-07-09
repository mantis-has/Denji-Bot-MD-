import axios from 'axios';

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, '🐬 𝙋𝙤𝙧 𝙛𝙖𝙫𝙤𝙧, 𝙞𝙣𝙜𝙧𝙚𝙨𝙖 𝙪𝙣 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢.', m, rcanal);
  }

  const instagramUrl = args[0];
  let res;

  try {
    await m.react('🐬');
    res = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/instagram-dl?url=${encodeURIComponent(instagramUrl)}`);
  } catch (e) {
    return conn.reply(m.chat, '🐬 𝙀𝙧𝙧𝙤𝙧 𝙖𝙡 𝙤𝙗𝙩𝙚𝙣𝙚𝙧 𝙙𝙖𝙩𝙤𝙨. 𝙑𝙚𝙧𝙞𝙛𝙞𝙘𝙖 𝙚𝙡 𝙚𝙣𝙡𝙖𝙘𝙚.', m);
  }

  const result = res.data;
  if (!result || result.data.length === 0) {
    return conn.reply(m.chat, '🐬 𝙉𝙤 𝙨𝙚 𝙚𝙣𝙘𝙤𝙣𝙩𝙧𝙖𝙧𝙤𝙣 𝙧𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤𝙨.', m);
  }

  const videoData = result.data[0]; 
  const videoUrl = videoData.dl_url;

  if (!videoUrl) {
    return conn.reply(m.chat, '🪼 𝙉𝙤 𝙨𝙚 𝙚𝙣𝙘𝙤𝙣𝙩𝙧ó 𝙪𝙣 𝙚𝙣𝙡𝙖𝙘𝙚 𝙙𝙚 𝙙𝙚𝙨𝙘𝙖𝙧𝙜𝙖 𝙫á𝙡𝙞𝙙𝙤.', m);
  }

  const maxRetries = 3;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: '🐬 𝘼𝙦𝙪í 𝙩𝙞𝙚𝙣𝙚𝙨 𝙚𝙡 𝙫𝙞𝙙𝙚𝙤 𝙙𝙚 𝙄𝙣𝙨𝙩𝙖𝙜𝙧𝙖𝙢.', fileName: 'instagram.mp4', mimetype: 'video/mp4' }, { quoted: m });
      await m.react('✅');
      break;
    } catch (e) {
      if (attempt === maxRetries) {
        await m.react('❌');
        return conn.reply(m.chat, '🐬 𝙀𝙧𝙧𝙤𝙧 𝙖𝙡 𝙚𝙣𝙫𝙞𝙖𝙧 𝙚𝙡 𝙫𝙞𝙙𝙚𝙤 𝙙𝙚𝙨𝙥𝙪é𝙨 𝙙𝙚 𝙫𝙖𝙧𝙞𝙤𝙨 𝙞𝙣𝙩𝙚𝙣𝙩𝙤𝙨.', m);
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

handler.help = ['instagram', 'insta'];
handler.tags = ['descargas'];
handler.command = /^(instagramdl|instagram|insta|igdl|ig|instagramdl2|instagram2|igdl2|ig2|instagramdl3|instagram3|igdl3|ig3)$/i
handler.register = true;

export default handler;