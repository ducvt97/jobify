import React from "react";
import { NavLink } from "react-router-dom";
import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  { id: 1, path: "/", text: "Stats", icon: <IoBarChartSharp /> },
  { id: 2, path: "all-jobs", text: "All Jobs", icon: <MdQueryStats /> },
  { id: 3, path: "add-job", text: "Add Job", icon: <FaWpforms /> },
  { id: 4, path: "profile", text: "profile", icon: <ImProfile /> },
];

const NavLinks = ({ linkClick }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, path, text, icon } = link;
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
