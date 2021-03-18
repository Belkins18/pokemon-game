
const { protocol, hostname } = window.location;
const port = 3000;
export default `${protocol}//${hostname}:${port}`