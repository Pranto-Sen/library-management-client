import axios from "axios";
import { storage } from "../utils/storage";
import { refreshToken } from "./authService";

const api = axios.create({
    baseURL: "https://localhost:7058/api"
});

// api.interceptors.request.use(config => {

//     const token = storage.getToken();

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

api.interceptors.request.use(

    config => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =

                `Bearer ${token}`;

        }

        return config;

    }

);

api.interceptors.response.use(

    response => response,

    async error => {

        const originalRequest = error.config;

        if (

            error.response?.status === 401 &&

            !originalRequest._retry

        ) {

            originalRequest._retry = true;

            try {

                // const tokens = await refreshToken();
                const refreshTokenValue = localStorage.getItem("refreshToken");

const response = await axios.post(
  "https://localhost:7058/api/auth/refresh",
  {
    refreshToken: refreshTokenValue,
  }
);

const tokens = response.data;

                localStorage.setItem(

                    "token",

                    tokens.accessToken

                );

                localStorage.setItem(

                    "refreshToken",

                    tokens.refreshToken

                );

                originalRequest.headers.Authorization =

                    `Bearer ${tokens.accessToken}`;

                return api(originalRequest);

            }

            catch {

                localStorage.clear();

                window.location.href = "/login";

            }

        }

        return Promise.reject(error);

    });

// api.interceptors.response.use(

// response=>response,

// error=>{

//     if(error.response?.status===401){

//         localStorage.removeItem("accessToken");

//         window.location="/login";
//     }

//     return Promise.reject(error);

// }

// );

export default api;