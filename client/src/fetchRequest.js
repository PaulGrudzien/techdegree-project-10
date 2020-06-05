import apiBaseUrl from './config.js'

async function fetchRequest(path, method, body = null) {
    try {
        const url = apiBaseUrl + path;
        const options = {
            method,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        };
        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        let response = await fetch(url, options);
        let data = await response.json();
        return data;
    } catch(error) {
        console.error(error)
    }
}

export default fetchRequest;
