import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: null,
};
const url = "http://localhost:3000/users";

// currently doing too many things in thunk action
// since I don't have a separate services module
// things like saving token in localStorage,
// navigating user back to homepage upon sign in successfully

// thunk to sign up (API call, setLocalStorage, navigate here as well)
export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ formData, navigate }, {rejectWithValue}) => {
    try {
      const res = await axios.post(`${url}/signup`, formData);
      localStorage.setItem("profile", JSON.stringify(res.data));
      navigate("/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
// thunk to sign in
export const signIn = createAsyncThunk(
  "auth/signin",
  async ({ navigate, formData }, {rejectWithValue}) => {
    try {
      const res = await axios.post(`${url}/signin`, formData);
      localStorage.setItem("profile", JSON.stringify(res.data));
      navigate("/");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);
// thunk to sign out
export const signOut = createAsyncThunk("auth/signOut", async () => {
  localStorage.removeItem("profile");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.userData = null;
      });
  },
});

export default authSlice.reducer;
