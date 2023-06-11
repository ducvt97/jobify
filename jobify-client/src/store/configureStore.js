import {
    configureStore
} from "@reduxjs/toolkit";
import commonReducer from "./commonReducer";
import userReducer from "./userReducer";


const store = configureStore({
    reducer: {
        common: commonReducer,
        user: userReducer
    }
});

export default store;