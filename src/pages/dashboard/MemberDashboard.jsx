import { useEffect, useState } from "react";

import { getMemberDashboard } from "../../services/dashboardService";

import MemberSummaryCards from "../../components/memberDashboard/MemberSummaryCards";
import BorrowedBooksTable from "../../components/memberDashboard/BorrowedBooksTable";
import ReservationTable from "../../components/memberDashboard/ReservationTable";

import "./Dashboard.css";

export default function MemberDashboard() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const data = await getMemberDashboard();

      setDashboard(data);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <h2>Loading...</h2>;

  return (
    <div className="dashboard">

      <MemberSummaryCards
        dashboard={dashboard}
      />

      <div className="dashboard-bottom">

        <BorrowedBooksTable
          data={dashboard.borrowedBooks}
        />

        <ReservationTable
          data={dashboard.reservations}
        />

      </div>

    </div>
  );
}