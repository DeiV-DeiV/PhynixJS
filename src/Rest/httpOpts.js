export const httpOpts = {
  GET: ()=>({
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }),
  POST: (data) => ({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }),
  PUT: (data) => ({
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }),
  DELETE: (id) => ({
    method:'DELETE',
    headers: {'Content-Type': 'application/json'}
  }),
};