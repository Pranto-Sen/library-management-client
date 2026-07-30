import { useAuth } from "../../context/AuthContext";

import AdminDashboard from "./AdminDashboard";
import MemberDashboard from "./MemberDashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return user.role === "Admin"
    ? <AdminDashboard />
    : <MemberDashboard />;
}