export function getToken() {
    return window.localStorage.getItem('simple_spa');
}

export function setToken(token) {
    return window.localStorage.setItem('simple_spa', token);
}

