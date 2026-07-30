import api from "./api";

export async function getReservations() {

    const response = await api.get("/reservations");


    return response.data.items;
}

export async function createReservation(data) {

    const response = await api.post(

        "/reservations",

        data

    );

    return response.data;
}

export async function cancelReservation(id) {

    const response = await api.put(

        `/reservations/${id}/cancel`

    );

    return response.data;
}

export async function checkoutReservation(id) {

    const response = await api.post(

        `/reservations/${id}/checkout`

    );

    return response.data;
}

export async function getMemberReservations(memberId){

    const response=await api.get(

        `/reservations/member/${memberId}`

    );

    return response.data;
}

export async function getReservationsbyId(memberId) {
  const response = await api.get(
    `/reservations/member/${memberId}`
  );

  return response.data;
}