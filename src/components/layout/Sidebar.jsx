import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.css";
import { useAuth } from "../../context/AuthContext";

import {
  FaBook,
  FaUsers,
  FaUser,
  FaBuilding,
  FaExchangeAlt,
  FaBookmark,
  FaChartPie,
} from "react-icons/fa";

export default function Sidebar() {
  const { user } = useAuth();

  const adminMenus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaChartPie />,
    },
    {
      name: "Books",
      path: "/books",
      icon: <FaBook />,
    },
    {
      name: "Members",
      path: "/members",
      icon: <FaUsers />,
    },
    // {
    //   name: "Users",
    //   path: "/users",
    //   icon: <FaUser />,
    // },
    {
      name: "Branches",
      path: "/branches",
      icon: <FaBuilding />,
    },
    {
      name: "Borrow",
      path: "/borrow",
      icon: <FaExchangeAlt />,
    },
    {
      name: "Reservations",
      path: "/reservations",
      icon: <FaBookmark />,
    },
  ];

  const memberMenus = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaChartPie />,
    },
     {
      name: "Books",
      path: "/books",
      icon: <FaBook />,
    },
    {
      name: "My Books",
      path: "/my-books",
      icon: <FaBook />,
    },
    {
      name: "My Reservations",
      path: "/my-reservations",
      icon: <FaBookmark />,
    },
  ];

  const menus = user?.role === "Admin" ? adminMenus : memberMenus;

  return (
    <aside className="sidebar">
      <h2 className="logo">Library</h2>

      <nav>
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {menu.icon}
            <span>{menu.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}