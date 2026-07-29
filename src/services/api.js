import axios from "axios";
import { storage } from "../utils/storage";

const api = axios.create({
    baseURL: "https://localhost:7000/api"
});

api.interceptors.request.use(config => {

    const token = storage.getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;