import api from "./api";

export async function getMemberDashboard() {
  const response = await api.get("/dashboard/member");
  return response.data;
}