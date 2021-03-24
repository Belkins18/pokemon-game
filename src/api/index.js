const _url = "https://reactmarathon-api.netlify.app/api";

class API_RESPONSE{
    constructor(method, url) {
        this.method = method;
        this.url = url
    }

    get options() {
        return {
            method: this.method,
            headers: {
                'Content-Type': 'application/json',
            }
        }
    }
}

const api = new API_RESPONSE();

const API = {
    board: {
        method: "GET",
        url: `${_url}/board`,
        options: api.options
    },
    createPlayer: {
        method: "GET",
        url: `${_url}/create-player`,
        options: api.options
    },
    playersTurn: {
        method: "GET",
        url: `${_url}/players-turn`,
        options: api.options
    }
}

export default API;