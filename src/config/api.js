// import axios from "axios";

// export const API_BASE_URL="http://localhost:8080";

// const jwtToken = localStorage.getItem("jwt");

// export const api = axios.create({baseURL:API_BASE_URL,
//     headers:{
//         "Authorization":`Bearer ${jwtToken}`,
//         "Content-Type" : "application/json"
//     }
// })
import axios from "axios";

export const API_BASE_URL = "https://social-media-app-backend-rl2d.onrender.com";

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