import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow } from "../../components";
import {
  clearAlert,
  displayAlert,
  setLoading,
} from "../../store/commonReducer";
import UserService from "../../services/user";
import { updateUser } from "../../store/userReducer";

const ProfilePage = () => {
  const user = useSelector((state) => state.user.user);
  const currentToken = useSelector((state) => state.user.token);
  const commonState = useSelector((state) => state.common);
  const [values, setValues] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    location: user.location,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearAlert());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    const { name, lastName, email, location } = values;
    if (!name || !lastName || !email || !location) {
      dispatch(
        displayAlert({
          alertType: "danger",
          alertText: "Please provide all values",
        })
      );
      dispatch(setLoading(false));
      return;
    }
    try {
      const res = await UserService.update(
        {
          name,
          lastName,
          email,
          location,
        },
        currentToken
      );
      const { user, token, userLocation } = res.data;
      dispatch(updateUser({ user, token, userLocation }));
      dispatch(
        displayAlert({
          alertType: "success",
          alertText: "User Profile Saved!",
        })
      );
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

  return (
    <Wrapper>
      <form action="" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {commonState.showAlert && (
          <Alert text={commonState.alertText} type={commonState.alertType} />
        )}
        <div className="form-center">
          <FormRow
            value={values.name}
            type="text"
            name="name"
            labelText="Name"
            handleChange={handleChange}
          />
          <FormRow
            value={values.lastName}
            type="text"
            name="lastName"
            labelText="Last Name"
            handleChange={handleChange}
          />
          <FormRow
            value={values.email}
            type="text"
            name="email"
            labelText="Email"
            handleChange={handleChange}
          />
          <FormRow
            value={values.location}
            type="text"
            name="location"
            labelText="Location"
            handleChange={handleChange}
          />
          <button className="btn btn-block" disabled={commonState.isLoading}>
            {commonState.isLoading ? "Please wait..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default ProfilePage;
