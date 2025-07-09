const handler = async (m) => {
  const modo = global.db.data.users[m.sender]?.modoAsta || 'aleatorio';

  const respuestas = {
    hot: [
      '🥵 ¿Quieres más? Porque yo sí.',
      '😈 ¡Aquí está tu dosis caliente!',
      '💋 Tócame... digo... ¡actívame!'
    ],
    épico: [
      '🩵 ¡No tengo magia, pero tengo agallas!',
      '🩵 *Modo Batalla* activado. ¿Estás listo?',
      '🩵 ¡Voy a romper mis límites aquí y ahora!'
    ],
    enojado: [
      '😡 ¡Te dije que no me molestaras!',
      '👿 Si sigues así, te voy a banear con estilo.',
      '🔥 ¿Qué parte de "enojado" no entendiste?'
    ],
    cansado: [
      '😴 Déjame dormir... o mejor, duerme conmigo.',
      '🥱 ¿Una siestita juntos?',
      'Zzz... incluso dormido soy más útil que tú.'
    ]
  };

  const modoReal = modo === 'aleatorio'
    ? Object.keys(respuestas)[Math.floor(Math.random() * 4)]
    : modo;

  const frase = respuestas[modoReal][Math.floor(Math.random() * respuestas[modoReal].length)];

  m.reply(`🎙️ *maki (${modoReal.toUpperCase()})*: ${frase}`);
};

handler.command = ['maki', 'makihabla', 'asta-habla'];
handler.tags = ['fun'];
handler.help = ['asta', 'asta-habla'];
handler.register = true;

export default handler;
