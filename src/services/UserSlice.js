import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUsers,
  fetchUser,
  fetchUserUpdate,
  fetchUserCreation,
  fetchUserDeletion,
} from "./api/User";

export const getUsers = createAsyncThunk("users/getUsers", async () =>
  fetchUsers()
);

export const getUser = createAsyncThunk("users/getUsers/:id", async (id) =>
  fetchUser(id)
);

export const updateUser = createAsyncThunk("users/updateUser", async (user) =>
  fetchUserUpdate(user)
);

export const createUser = createAsyncThunk("users/createUser", async (user) =>
  fetchUserCreation(user)
);

export const deleteUser = createAsyncThunk("users/deleteUser/:id", async (id) =>
  fetchUserDeletion(id)
);

const carSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: undefined,
    loading: false,
    error: false,
  },
  extraReducers: {
    // GET ALL
    [getUsers.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [getUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      (state.loading = false), (state.error = false);
    },
    [getUsers.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // GET ONE
    [getUser.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      (state.loading = false), (state.error = false);
    },
    [getUser.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // PUT
    [updateUser.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [updateUser.fulfilled]: (state, action) => {
      state.users = state.users.map((u) => {
        if (u.id == action.payload.id) return action.payload;
        return u;
      });
      (state.loading = false), (state.error = false);
    },
    [updateUser.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // POST
    [createUser.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [createUser.fulfilled]: (state, action) => {
      state.users.push(action.payload);
      (state.loading = false), (state.error = false);
    },
    [createUser.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
    // DELETE
    [deleteUser.pending]: (state) => {
      (state.loading = true), (state.error = false);
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.users = state.users.filter(
        (c) => c.user_id != action.payload.user_id
      );
      (state.loading = false), (state.error = false);
    },
    [deleteUser.rejected]: (state) => {
      (state.loading = false), (state.error = true);
    },
  },
});

export default carSlice.reducer;
