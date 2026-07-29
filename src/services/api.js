import axios from "axios";
import { storage } from "../utils/storage";

const api = axios.create({
    baseURL: "https://localhost:7058/api"
});

api.interceptors.request.use(config => {

    const token = storage.getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(

response=>response,

error=>{

    if(error.response?.status===401){

        localStorage.removeItem("accessToken");

        window.location="/login";
    }

    return Promise.reject(error);

}

);

export default api;