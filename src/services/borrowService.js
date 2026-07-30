import api from "./api";

export async function getBorrowRecords() {
  const response = await api.get("/borrow-records");

  return response.data;
}

export async function getBorrowRecord(id) {
  const response = await api.get(`/borrow-records/${id}`);

  return response.data;
}

export async function borrowBook(data) {
  const response = await api.post(
    "/borrow-records/borrow",
    data
  );

  return response.data;
}

export async function returnBook(borrowRecordId) {
  const response = await api.post(
    "/borrow-records/return",
    {
      borrowRecordId,
    }
  );

  return response.data;
}

export async function payFine(borrowRecordId) {
  const response = await api.post(
    "/borrow-records/pay-fine",
    {
      borrowRecordId,
    }
  );

  return response.data;
}

export async function getBorrowHistory(memberId) {
  const response = await api.get(
    `/borrow-records/member/${memberId}`
  );

  return response.data;
}