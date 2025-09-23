export function deepFreeze(obj) {
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null) obj[k] = deepFreeze(v);
  }
  return Object.freeze(obj);
}