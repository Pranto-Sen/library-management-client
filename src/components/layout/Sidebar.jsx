import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";


export default function Sidebar() {

    const menus = [
        { name: "Dashboard", path: "/" },
        { name: "Books", path: "/books" },
        { name: "Members", path: "/members" },
        { name: "Users", path: "/users" },
        { name: "Branches", path: "/branches" },
        { name: "Borrow", path: "/borrow" },
        { name: "Reservations", path: "/reservations" },
        { name: "Profile", path: "/profile" }
    ];

    return (
        <aside className="sidebar">

            <h2 className="logo">
                Library
            </h2>

            <nav>

                {menus.map(menu => (

                    <NavLink
                        key={menu.path}
                        to={menu.path}
                        className={({ isActive }) =>
                            isActive ? "active" : ""
                        }
                    >
                        {menu.name}
                    </NavLink>

                ))}

            </nav>

        </aside>
    );
}