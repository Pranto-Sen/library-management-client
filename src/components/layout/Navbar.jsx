import "../../styles/Navbar.css";

import useAuth from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";

import { FaSignOutAlt } from "react-icons/fa";

export default function Navbar(){

    const {user,logout}=useAuth();

    const navigate=useNavigate();

    function handleLogout(){

        logout();

        navigate("/login");

    }

    return(

        <header className="navbar">

            <h3>

                Library Management System

            </h3>

            <div className="navbar-right">

                <span>

                    {user?.email}

                </span>

                <button onClick={handleLogout}>

                    <FaSignOutAlt/>

                    Logout

                </button>

            </div>

        </header>

    );

}