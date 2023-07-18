import React from "react";

import Wrapper from "../../assets/wrappers/StatsContainer";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminPage = () => {
  const role = useSelector((state) => state.user.user.role);

  return role !== "admin" ? <Navigate to="/" /> : <Wrapper>AdminPage</Wrapper>;
};

export default AdminPage;
