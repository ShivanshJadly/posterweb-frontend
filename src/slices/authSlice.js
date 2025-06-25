import { createSlice } from "@reduxjs/toolkit";

let token = null;
let signupData = null;

const rawToken = localStorage.getItem("token");
const rawUser = localStorage.getItem("user");

if (rawToken && rawToken !== "undefined") {
  try {
    token = JSON.parse(rawToken);
  } catch (err) {
    console.error("Error parsing token from localStorage:", err);
    token = null;
  }
}

if (rawUser && rawUser !== "undefined") {
  try {
    signupData = JSON.parse(rawUser);
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    signupData = null;
  }
}

const initialState = {
  signupData: null,
  loading: false,
  token: token,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
