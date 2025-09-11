export function getDataArray(apiJson) {
  if (Array.isArray(apiJson)) return apiJson;

  for (const key in apiJson) {
    if (Array.isArray(apiJson[key])) return apiJson[key];
  }

  return [apiJson];
}
