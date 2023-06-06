import {
    configureStore
} from "@reduxjs/toolkit";
import commonReducer from "./commonReducer";


const store = configureStore({
    reducer: {
        common: commonReducer
    }
});

export default store;