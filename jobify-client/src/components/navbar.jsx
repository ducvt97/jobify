import React, { useState } from "react";

import { FaAlignLeft, FaUserCircle, FaChevronDown } from "react-icons/fa";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./logo";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, toggleSidebar } from "../store/commonReducer";
import { logout } from "../store/userReducer";
import UserService from "../services/user";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <FaUserCircle />
            {user.name}
            <FaChevronDown />
          </button>
          {showDropdown && (
            <div
              className={showDropdown ? "dropdown show-dropdown" : "dropdown"}
            >
              <button
                type="button"
                className="dropdown-btn"
                onClick={async () => {
                  try {
                    dispatch(setLoading(true));
                    await UserService.logout();
                    dispatch(logout());
                  } catch (error) {
                    console.log(error);
                  } finally {
                    dispatch(setLoading(false));
                  }
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
