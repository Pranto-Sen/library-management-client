import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../services/authService";

import SummaryCards from "../../components/dashboard/SummaryCards";
import RecentBorrowTable from "../../components/dashboard/RecentBorrowTable";
import RecentMemberTable from "../../components/dashboard/RecentMemberTable";
import OverdueBookTable from "../../components/dashboard/OverdueBookTable";

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const response = await getDashboardSummary();
      setDashboard(response);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="dashboard">
      <SummaryCards dashboard={dashboard} />

      <RecentBorrowTable data={dashboard.recentBorrows} />

      <div className="dashboard-bottom">
        <RecentMemberTable data={dashboard.recentMembers} />

        <OverdueBookTable data={dashboard.overdueBooks} />
      </div>
    </div>
  );
}