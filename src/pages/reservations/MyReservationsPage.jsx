import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import { getMemberId } from "../../services/memberService";

import { getReservationsbyId } from "../../services/reservationService";

import MyReservationsTable from "../../components/reservations/MyReservationsTable";

import "./Reservations.css";

export default function MyReservationsPage() {
  const { user } = useAuth();

  const [reservations, setReservations] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, []);

  async function loadReservations() {
    try {
      // First API
      const memberId = await getMemberId(user.id);

      // Second API
      const data = await getReservationsbyId(memberId);

      setReservations(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <h2>My Reservations</h2>
      </div>

      <MyReservationsTable
        data={reservations}
      />

    </div>
  );
}