import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchColors,
  fetchColor,
  fetchColorUpdate,
  fetchColorCreation,
  fetchColorDeletion,
} from "./api/Color";

export const getColors = createAsyncThunk("colors/getColors", async () =>
  fetchColors()
);

export const getColor = createAsyncThunk("colors/getColors/:id", async (id) =>
  fetchColor(id)
);

export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async (color) => fetchColorUpdate(color)
);

export const createColor = createAsyncThunk(
  "colors/createColor",
  async (color) => fetchColorCreation(color)
);

export const deleteColor = createAsyncThunk(
  "colors/deleteColor/:id",
  async (id) => fetchColorDeletion(id)
);

const colorSlice = createSlice({
  name: "colors",
  initialState: {
    colors: [],
    color: undefined,
    loading: false,
    error: false,
  },
  extraReducers: {
    // GET ALL
    [getColors.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [getColors.fulfilled]: (state, action) => {
      state.colors = action.payload;
      (state.loading = false), (state.error = false);
    },
    [getColors.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // GET ONE
    [getColor.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [getColor.fulfilled]: (state, action) => {
      state.color = action.payload;
      (state.loading = false), (state.error = false);
    },
    [getColor.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // PUT
    [updateColor.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [updateColor.fulfilled]: (state, action) => {
      state.colors = state.colors.map((c) => {
        if (c.color_id == action.payload.color_id) return action.payload;
        return c;
      });
      (state.loading = false), (state.error = false);
    },
    [updateColor.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // POST
    [createColor.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [createColor.fulfilled]: (state, action) => {
      state.colors.push(action.payload);
      (state.loading = false), (state.error = false);
    },
    [createColor.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // DELETE
    [deleteColor.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [deleteColor.fulfilled]: (state, action) => {
      state.colors = state.colors.filter(
        (c) => c.color_id != action.payload.color_id
      );
      (state.loading = false), (state.error = false);
    },
    [deleteColor.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
  },
});

export default colorSlice.reducer;
