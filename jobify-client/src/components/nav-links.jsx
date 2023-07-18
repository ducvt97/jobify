import React from "react";
import { NavLink } from "react-router-dom";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { MdAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";

const links = [
  { id: 1, path: "/", text: "Stats", icon: <IoBarChartSharp /> },
  { id: 2, path: "all-jobs", text: "All Jobs", icon: <MdQueryStats /> },
  { id: 3, path: "add-job", text: "Add Job", icon: <FaWpforms /> },
  { id: 4, path: "profile", text: "profile", icon: <ImProfile /> },
  { id: 5, path: "admin", text: "admin", icon: <MdAdminPanelSettings /> },
];

const NavLinks = ({ linkClick }) => {
  const role = useSelector(state => state.user.user.role);

  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, path, text, icon } = link;
        if (role !== "admin" && id === 5) return null;

        return (
          <NavLink
            to={path}
            key={id}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
            onClick={linkClick}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
