class API{
    address = "";
    constructor(address){
        this.address = address;
    }
    get(path, params = {}, headers = {}){
        const query = this.address+path;
        let authHeaders = {};
        if(Object.keys(params).length){
            query+=`?${this.objectToUrl(params)}`
        }
        if(localStorage.accessToken){
            authHeaders = {
                'Authorization': localStorage.accessToken
            }
        }
        return fetch(query, {
            method: 'GET',
            headers: {
                ...authHeaders,
                ...headers
            }
        });
    }
    post(path, params = {}, headers = {}){
        const query = this.address+path;
        const authHeaders = {};
        if(localStorage.accessToken){
            authHeaders = {
                'Authorization': localStorage.accessToken
            }
        }
        return fetch(query, {
            method: 'POST',
            headers: {
                ...authHeaders,
                'Content-Type': 'application/json;charset=utf-8',
                ...headers
            },
            body: JSON.stringify(params)
        });
    }
    delete(path, params = {}, headers = {}){
        const query = this.address+path;
        let authHeaders = {};
        if(localStorage.accessToken){
            authHeaders = {
                'Authorization': localStorage.accessToken
            }
        }
        return fetch(query, {
            method: 'DELETE',
            headers: {
                ...authHeaders,
                ...headers
            }
        });
    }
    request(path, options){
        const { method = 'GET' } = options;
        const { params = {} } = options;
        const { body = '' } = options;
        let { headers = {} } = options;
        let query = this.address+path;
        if(localStorage.accessToken){
            headers = {
                ...headers,
                'Authorization': localStorage.accessToken
            }
        }
        if(Object.keys(params).length){
            query+=`?${this.objectToUrl(params)}`
        }
        return fetch(query, {
            method,
            headers,
            body
        });
    }
    objectToUrl(params){
        var esc = encodeURIComponent;
        return Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
    }
    async uploadMedia(blob){
        const fromData = new FormData();
        fromData.append('file', blob);
        const resp = await fetch('https://api.renics.org/files/', {
            method: 'POST',
            body: fromData
        });
        const { file } = await resp.json();
        return file;
    }
}

export default new API(process.env.REACT_APP_API_URL);