import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCars,
  fetchCar,
  fetchCarUpdate,
  fetchCarCreation,
  fetchCarDeletion,
} from "./api/Car";

export const getCars = createAsyncThunk("cars/getCars", async () =>
  fetchCars()
);

export const getCar = createAsyncThunk("cars/getCars/:id", async (id) =>
  fetchCar(id)
);

export const updateCar = createAsyncThunk("cars/updateCar", async (car) =>
  fetchCarUpdate(car)
);

export const createCar = createAsyncThunk("cars/createCar", async (car) =>
  fetchCarCreation(car)
);

export const deleteCar = createAsyncThunk("cars/deleteCar/:id", async (id) =>
  fetchCarDeletion(id)
);

const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    car: undefined,
    selectedColorIds: [],
    loading: false,
    error: false,
  },
  reducers: {
    setColorIds: (state, action) => {
      state.selectedColorIds = action.payload;
    },
  },
  extraReducers: {
    // GET ALL
    [getCars.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [getCars.fulfilled]: (state, action) => {
      state.cars = action.payload;
      (state.loading = false), (state.error = false);
    },
    [getCars.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // GET ONE
    [getCar.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [getCar.fulfilled]: (state, action) => {
      state.car = action.payload;
      state.selectedColorIds = action.payload.colors.map((c) => c.color_id);
      state.loading = false;
      state.error = false;
    },
    [getCar.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // PUT
    [updateCar.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [updateCar.fulfilled]: (state, action) => {
      state.cars = state.cars.map((c) => {
        if (c.car_id == action.payload.car_id) return action.payload;
        return c;
      });
      (state.loading = false), (state.error = false);
    },
    [updateCar.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // POST
    [createCar.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [createCar.fulfilled]: (state, action) => {
      state.cars.push(action.payload);
      (state.loading = false), (state.error = false);
    },
    [createCar.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // DELETE
    [deleteCar.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [deleteCar.fulfilled]: (state, action) => {
      state.cars = state.cars.filter((c) => c.car_id != action.payload.car_id);
      (state.loading = false), (state.error = false);
    },
    [deleteCar.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
  },
});

export const { setColorIds } = carSlice.actions;
export default carSlice.reducer;
