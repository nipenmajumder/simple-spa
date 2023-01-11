import axios from "axios";
import { getToken } from './auth'

const BASE_URL = "http://simple-spa.test/api";

export const request = axios.create({
    baseURL: BASE_URL
});

request.interceptors.request.use((config) => {
    const TOKEN = getToken() || null;

    config.headers = {
        "Accept": 'application/json',
        "Authorization": `Bearer ${TOKEN}`,
    };

    return config;
});
