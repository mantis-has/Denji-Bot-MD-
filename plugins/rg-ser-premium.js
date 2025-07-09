//código creado x The Carlos 👑
//no olvides dejar créditos 

let handler = async (m, { conn, text, usedPrefix, command }) => {
  const emoji = '🌟';
  const emoji2 = '⚠️';
  const moneda = 'monedas mágicas';
  let user = global.db.data.users[m.sender];

  const isOwner = global.owner?.map(v => v + '@s.whatsapp.net').includes(m.sender);
  if (isOwner) {
    user.premium = true;
    user.premiumTime = Infinity;
    return conn.reply(m.chat, `${emoji} *¡Eres el Gran Hechicero Supremo (Owner)!*\n🎖️ Tu membresía premium es *permanente*.`, m);
  }

  if (!text) {
    return conn.reply(
      m.chat,
      `${emoji2} *Indica la duración de la membresía.*\n\nEjemplo:\n${usedPrefix + command} 1 dia`,
      m
    );
  }

  let [amount, unit] = text.trim().split(' ');
  amount = parseInt(amount);
  unit = unit?.toLowerCase();

  if (isNaN(amount) || amount <= 0) {
    return conn.reply(m.chat, `${emoji2} *La cantidad debe ser un número positivo.*`, m);
  }

  const unidades = {
    minuto: 1,
    minutos: 1,
    hora: 60,
    horas: 60,
    dia: 1440,
    dias: 1440
  };

  if (!unit || !(unit in unidades)) {
    return conn.reply(m.chat, `${emoji2} *Unidad de tiempo no válida.* Usa: minutos, horas o días.`, m);
  }

  let minutos = amount * unidades[unit];

  // 🔐 Límite máximo de 7 días (10080 minutos)
  if (minutos > 10080) {
    return conn.reply(m.chat, `${emoji2} *No puedes comprar más de 7 días de premium por vez.*\nIntenta con una duración menor.`, m);
  }

  let costo = Math.ceil(minutos / 100); // 🔥 Precio más alto

  if (user.coin < costo) {
    return conn.reply(
      m.chat,
      `${emoji2} *No tienes suficientes ${moneda}.*\nNecesitas *${costo} ${moneda}* y tienes *${user.coin || 0}*.`,
      m
    );
  }

  user.coin -= costo;
  user.premium = true;
  user.premiumTime = Date.now() + minutos * 60 * 1000;

  return conn.reply(
    m.chat,
    `${emoji} *¡Compra completada con éxito!*\n🎖️ Ahora eres Premium por *${amount} ${unit}*.\n💰 Has gastado *${costo} ${moneda}*.\n\n🧙‍♂️ ¡La magia del grimorio te acompaña, caballero!`,
    m
  );
};

handler.help = ['comprarpremium <cantidad> <unidad>'];
handler.tags = ['premium'];
handler.command = ['comprarpremium', 'premium', 'vip'];
handler.register = true;

export default handler;