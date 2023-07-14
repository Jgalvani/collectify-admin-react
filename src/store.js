import { configureStore } from "@reduxjs/toolkit";
import CarReducer from "./services/CarSlice";
import ColorReducer from "./services/ColorSlice";
import UserReducer from "./services/UserSlice";

const store = configureStore({
  reducer: {
    car: CarReducer,
    color: ColorReducer,
    user: UserReducer,
  },
});

export default store;
