import apiBaseUrl from './config.js'

async function fetchRequest(path, method, body = null, requiresAuth = false, credentials = null) {
    try {
        const url = apiBaseUrl + path;
        const options = {
            method,
            headers: {'Content-Type': 'application/json; charset=utf-8'}
        };
        if (body !== null) {
            options.body = JSON.stringify(body);
        }
        if (requiresAuth) {  
            options.headers['Authorization'] = `Basic ${credentials}`;
        }
        let response = await fetch(url, options);
        return response
    } catch(error) {
        console.error(error);
        window.location = "/error";
    }
}

export default fetchRequest;
