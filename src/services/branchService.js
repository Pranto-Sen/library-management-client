import api from "./api";

export async function getBranches() {

    const response = await api.get("/Branches");

    return response.data.data.items;
}