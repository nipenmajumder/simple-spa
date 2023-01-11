export function getToken() {
    return window.localStorage.getItem('bt-admin');
}

export function setToken(token) {
    return window.localStorage.setItem('bt-admin', token);
}

