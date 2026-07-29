import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Layout from "../components/layout/Layout";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";

export default function AppRoutes() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/"
                element={
                    <PrivateRoute>

                        <Layout>

                            <DashboardPage />

                        </Layout>

                    </PrivateRoute>
                }
            />

        </Routes>

    );

}