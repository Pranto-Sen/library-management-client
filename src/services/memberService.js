import api from "./api";

export async function getMembers(pageNumber = 1, pageSize = 10) {
  const response = await api.get("/members", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
}

export async function createMember(data) {
  const response = await api.post("/members", data);

  return response.data;
}

export async function updateMember(id, data) {
  const response = await api.put(`/members/${id}`, {
    ...data,
    id,
  });

  return response.data;
}

export async function deleteMember(id) {
  const response = await api.delete(`/members/${id}`);

  return response.data;
}

export async function getMemberId(userId) {
  const response = await api.get(`/members/user/${userId}`);

  return response.data.data.memberId;
}