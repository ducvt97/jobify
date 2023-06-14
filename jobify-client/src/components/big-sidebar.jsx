import React from "react";
import { useSelector } from "react-redux";

import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./nav-links";
import Logo from "./logo";

const BigSidebar = () => {
  const showSidebar = useSelector((state) => state.common.showSidebar);

  return (
    <Wrapper>
      <div
        className={`sidebar-container ${!showSidebar ? "show-sidebar" : ""}`}
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default BigSidebar;
