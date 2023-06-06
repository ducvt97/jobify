import React, { useState } from 'react'

import Wrapper from '../assets/wrappers/RegisterPage'
import Logo from '../components/logo'
import FormRow from '../components/form_row'
import Alert from '../components/alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearAlert, displayAlert } from '../store/commonReducer'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  const commonState = useSelector(state => state.common);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email, password, isMember} = values;
    if (!email || !password || (!isMember && !name)) {
      dispatch(displayAlert({alertType: 'danger', alertText: 'Please provide all values.'}));
    } else {
      dispatch(clearAlert());
    }
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  }

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={handleSubmit}>
        <Logo />
        <h3>Login</h3>
        {commonState.showAlert && <Alert text={commonState.alertText} />}
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
          {values.isMember ? 'Submit' : 'Register'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
