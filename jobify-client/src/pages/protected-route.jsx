import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout, setCurrentUser } from "../store/userReducer";
import { Loading } from "../components";
import UserService from "../services/user";
import JobService from "../services/job";
import { clearAlert } from "../store/commonReducer";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user);
  const [loadingUser, setLoadingUser] = useState(true);
  const dispatch = useDispatch();

  const unauthorizedHandler = () => {
    dispatch(clearAlert());
    dispatch(logout());
  }
  
  useEffect(() => {
    JobService.setupInterceptor(unauthorizedHandler);

    const getUser = async () => {
      try {
        const res = await UserService.getCurrentUser();
        const { user, userLocation } = res.data;
        dispatch(setCurrentUser({ user, userLocation }));
      } catch (error) {
        unauthorizedHandler();
      } finally {
        setLoadingUser(false)
      }
    
    };
    getUser();
    
  }, []);

  if (loadingUser) {
    return <Loading center />
  }

  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};

export default ProtectedRoute;
