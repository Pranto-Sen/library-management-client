import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import BooksPage from "./../pages/books/BooksPage";
import MembersPage from "../pages/members/MembersPage";
import BorrowPage from "../pages/borrow/BorrowPage";
import ReservationsPage from "../pages/reservations/ReservationsPage";
import BranchesPage from "../pages/branches/BranchesPage";
import MyBooksPage from "../pages/borrow/MyBooksPage";
import MyReservationsPage from "../pages/reservations/MyReservationsPage";
import RegisterPage from "../pages/auth/RegisterPage";

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
          <ProtectedRoute roles={["Admin", "Member"]}>
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

      <Route
        path="/reservations"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <Layout>
              <ReservationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/branches"
        element={
          <ProtectedRoute roles={["Admin"]}>
            <Layout>
              <BranchesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-books"
        element={
          <ProtectedRoute roles={["Member"]}>
            <Layout>
              <MyBooksPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-reservations"
        element={
          <ProtectedRoute roles={["Member"]}>
            <Layout>
              <MyReservationsPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route

path="/register"

element={<RegisterPage/>}

/>
    </Routes>
  );
}
