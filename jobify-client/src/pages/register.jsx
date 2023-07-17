import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserService from "../services/user";
import { useNavigate } from "react-router-dom";

import Wrapper from "../assets/wrappers/RegisterPage";
import { Alert, FormRow, Logo } from "../components";
import { clearAlert, displayAlert, setLoading } from "../store/commonReducer";
import { login } from "../store/userReducer";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const commonState = useSelector((state) => state.common);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        dispatch(clearAlert());
        navigate("/");
      }, 1500);
    }
  }, [user]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    dispatch(setLoading(true));
    if (!email || !password || (!isMember && !name)) {
      dispatch(
        displayAlert({
          alertType: "danger",
          alertText: "Please provide all values.",
        })
      );
      dispatch(setLoading(false));
      return;
    } else {
      dispatch(clearAlert());
    }

    try {
      if (values.isMember) {
        const res = await UserService.login({ email, password });
        const { user, userLocation } = res.data;

        dispatch(
          displayAlert({
            alertType: "success",
            alertText: "Login successfully. Redirecting...",
          })
        );

        dispatch(login({ user, userLocation }));
      } else {
        const res = await UserService.register({ name, email, password });
        const { user, userLocation } = res.data;

        dispatch(
          displayAlert({
            alertType: "success",
            alertText: "Register successfully. Redirecting...",
          })
        );
        dispatch(login({ user, userLocation }));
      }
    } catch (error) {
      dispatch(
        displayAlert({
          alertType: "danger",
          alertText: error.response.data.msg,
        })
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Login</h3>
        {commonState.showAlert && (
          <Alert text={commonState.alertText} type={commonState.alertType} />
        )}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            labelText="Name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          labelText="Email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          labelText="Password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          {values.isMember ? "Submit" : "Register"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            className="member-btn"
            onClick={toggleMember}
            disabled={commonState.isLoading}
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
