
import axios from "axios";

export const API_BASE_URL = "https://social-media-app-backend-h6yf.onrender.com";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use(
    (config) => {
        const jwt = localStorage.getItem("jwt");

        if (jwt && jwt !== "null" && jwt !== "undefined") {
            config.headers.Authorization = `Bearer ${jwt}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);