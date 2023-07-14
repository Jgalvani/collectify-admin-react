import { createSlice } from "@reduxjs/toolkit";

const selectedColorIdSlice = createSlice({
  name: "selectedColors",
  initialState: {
    selectedColorIds: [],
  },
  reducers: {
    addColorId: (state, action) => {
      state.selectedColorIds.push(action.payload);
    },
    addColorIds: (state, action) => {
      state.selectedColorIds = [...state.selectedColorIds, ...action.payload];
    },
    removeColorId: (state, action) => {
      state.selectedColorIds = state.selectedColorIds.filter(
        (c) => c.color_id != action.payload.color_id
      );
    },
    setColorIds: (state, action) => {
      state.selectedColorIds = action.payload;
    },
  },
});

export const { addColorId, addColorIds, removeColorId, setColorIds } =
  selectedColorIdSlice.actions;
export default selectedColorIdSlice.reducer;
