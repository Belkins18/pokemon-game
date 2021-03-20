
const { protocol, hostname } = window.location;
const port = 2222;
export const url = `${protocol}//${hostname}:${port}`