import {
    createSlice
} from "@reduxjs/toolkit";

const initState = {
    user: null,
    token: null,
    userLocation: '',
}

const userSlice = createSlice({
    initialState: initState,
    name: 'User',
    reducers: {
        login: (state, action) => {},
        logout: (state, action) => {
            state.user = null;
            state.token = null;
            state.userLocation = ''
        },
        updateUser: (state, action) => {}
    }
})

export default userSlice.reducer