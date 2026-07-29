import "../../styles/Navbar.css";

import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar(){

    const navigate=useNavigate();

    const {logout,user}=useAuth();

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

                    Logout

                </button>

            </div>

        </header>

    );

}