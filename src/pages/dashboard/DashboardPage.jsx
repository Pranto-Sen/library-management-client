import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../services/authService";

// import { getDashboard } from "../../services/dashboardService";

import SummaryCards from "../../components/dashboard/SummaryCards";
import RecentBorrowTable from "../../components/dashboard/RecentBorrowTable";
import RecentMemberTable from "../../components/dashboard/RecentMemberTable";
import OverdueBookTable from "../../components/dashboard/OverdueBookTable";

// import "./DashboardPage.css";

export default function DashboardPage() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const response = await getDashboardSummary();

            setDashboard(response);

        }
        catch (error) {

            console.log(error);

        }
        finally {

            setLoading(false);

        }

    }

    if (loading)
        return <h2>Loading...</h2>;

    return (

    <div className="dashboard">

        <SummaryCards dashboard={dashboard} />

        <RecentBorrowTable
            data={dashboard.recentBorrows}
        />

        <div className="dashboard-bottom">

            <RecentMemberTable
                data={dashboard.recentMembers}
            />

            <OverdueBookTable
                data={dashboard.overdueBooks}
            />

        </div>

    </div>

);

}