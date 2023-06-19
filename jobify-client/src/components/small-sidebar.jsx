import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import Logo from "./logo";
import { toggleSidebar } from "../store/commonReducer";
import NavLinks from "./nav-links";

const SmallSidebar = () => {
  const showSidebar = useSelector((state) => state.common.showSidebar);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button
            type="button"
            className="close-btn"
            onClick={() => dispatch(toggleSidebar())}
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks linkClick={() => dispatch(toggleSidebar())} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
