import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import PrivateRoute from "./PrivateRoute";

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

                        <DashboardPage />

                    </PrivateRoute>
                }
            />

        </Routes>

    );

}