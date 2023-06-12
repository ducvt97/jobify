import { createSlice } from '@reduxjs/toolkit'

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const location = localStorage.getItem('location')
console.log(user)
const initState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  userLocation: location || '',
}

const addUserToLocalStorage = ({ user, token, userLocation }) => {
  console.log(user, token, userLocation)
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  localStorage.setItem('location', userLocation)
}
const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.removeItem('location')
}

const userSlice = createSlice({
  initialState: initState,
  name: 'User',
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.userLocation = action.payload.userLocation
      addUserToLocalStorage(state)
    },
    logout: (state, _) => {
      state.user = null
      state.token = null
      state.userLocation = ''
      removeUserFromLocalStorage()
    },
    updateUser: (state, action) => {},
  },
})

export const { login, logout, updateUser } = userSlice.actions
export default userSlice.reducer
