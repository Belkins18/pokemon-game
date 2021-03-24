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

const API_STRUCT = {
    board: {
        method: "GET",
        url: `${_url}/board`,
    },
    createPlayer: {
        method: "GET",
        url: `${_url}/create-player`,
    },
    playersTurn: {
        method: "GET",
        url: `${_url}/players-turn`,
    }
}

const api = Object.entries(API_STRUCT).reduce((prev, curr) => {
    console.log(prev)
    console.log(curr)
    const key = curr[0];
    let values = curr[1];

    return prev[key] = {
        ...prev,
        [key]: {
            ...values,
            options: new API_RESPONSE(values.method, values.url).options
        }
    };
}, {});

export default api;