import api from "./api";

export async function getBranches() {

    const response = await api.get("/Branches");

    return response.data.data.items;
}

export async function getBranch(id) {
  const response = await api.get(`/Branches/${id}`);

  return response.data;
}

export async function createBranch(data) {
  const response = await api.post(
    "/Branches",
    data
  );

  return response.data;
}

export async function updateBranch(id, data) {
  const response = await api.put(
    `/Branches/${id}`,
    {
      ...data,
      id,
    }
  );

  return response.data;
}

export async function deleteBranch(id) {
  const response = await api.delete(
    `/Branches/${id}`
  );

  return response.data;
}