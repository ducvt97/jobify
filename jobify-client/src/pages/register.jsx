import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserService from '../services/user'
import { useNavigate } from 'react-router-dom'

import Wrapper from '../assets/wrappers/RegisterPage'
import { Alert, FormRow, Logo } from '../components'
import { clearAlert, displayAlert, setLoading } from '../store/commonReducer'
import { login } from '../store/userReducer'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
}

const Register = () => {
  const [values, setValues] = useState(initialState)
  const commonState = useSelector((state) => state.common)
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      console.log(user)
      setTimeout(() => navigate('/'), 1500)
    }
  }, [user, navigate])

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    dispatch(setLoading(true))
    if (!email || !password || (!isMember && !name)) {
      dispatch(
        displayAlert({
          alertType: 'danger',
          alertText: 'Please provide all values.',
        }),
      )
    } else {
      dispatch(clearAlert())
    }

    if (values.isMember) {
      UserService.login({ email, password })
        .then((res) => {
          const { user, token, userLocation } = res.data
          dispatch(
            displayAlert({
              alertType: 'success',
              alertText: 'Login successfully. Redirecting...',
            }),
          )
          dispatch(setLoading(false))
          dispatch(login({ user, token, userLocation }))
        })
        .catch((err) => {
          dispatch(
            displayAlert({
              alertType: 'danger',
              alertText: err.response.data.msg,
            }),
          )
          dispatch(setLoading(false))
        })
    } else {
      UserService.register({ name, email, password })
        .then((res) => {
          const { user, token, userLocation } = res.data
          dispatch(
            displayAlert({
              alertType: 'success',
              alertText: 'Register successfully. Redirecting...',
            }),
          )
          dispatch(setLoading(false))
          dispatch(login({ user, token, userLocation }))
        })
        .catch((err) => {
          dispatch(
            displayAlert({
              alertType: 'danger',
              alertText: err.response.data.msg,
            }),
          )
          dispatch(setLoading(false))
        })
    }
  }

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

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
          {values.isMember ? 'Submit' : 'Register'}
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button
            type="button"
            className="member-btn"
            onClick={toggleMember}
            disabled={commonState.isLoading}
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  )
}

export default Register
