
// Función para verificar si un usuario es soporte
export function isSupport(userId) {
  if (!global.db.data.soporte) return false;
  return global.db.data.soporte.some(support => support.number === userId);
}

// Función para verificar si es owner o soporte
export function isOwnerOrSupport(userId) {
  const isOwner = global.owner.some(owner => owner[0] + '@s.whatsapp.net' === userId);
  return isOwner || isSupport(userId);
}
