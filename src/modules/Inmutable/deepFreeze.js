export function deepFreeze(obj={}) {
  if(!typeof obj === 'object') return
  
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'object' && v !== null) obj[k] = deepFreeze(v);
  }
  return Object.freeze(obj);
}