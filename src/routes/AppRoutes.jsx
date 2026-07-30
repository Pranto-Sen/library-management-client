import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import BooksPage from "./../pages/books/BooksPage";
import MembersPage from "../pages/members/MembersPage";
import BorrowPage from "../pages/borrow/BorrowPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute roles={["Admin", "Member"]}>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/books"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <Layout>
              <BooksPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/members"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <Layout>
              <MembersPage />
            </Layout>
          </ProtectedRoute>
        }
      />

       <Route
        path="/borrow"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <Layout>
              <BorrowPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
