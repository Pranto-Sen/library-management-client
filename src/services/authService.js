import api from "./api";

export async function login(data) {
    const response = await api.post("/auth/login", data);

    return response.data.data;
}

export async function getDashboardSummary() {

    const response = await api.get("/Dashboard");

    return response.data;

}

export async function refreshToken() {

    const token = localStorage.getItem("refreshToken");

    const response = await api.post(

        "/auth/refresh",

        {

            refreshToken: token

        }

    );

    return response.data.data;

}