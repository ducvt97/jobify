import {
    configureStore
} from "@reduxjs/toolkit";
import commonReducer from "./commonReducer";
import userReducer from "./userReducer";
import jobReducer from "./jobReducer";


const store = configureStore({
    reducer: {
        common: commonReducer,
        user: userReducer,
        job: jobReducer,
    }
});

export default store;