import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index";
import { ThemeProvider } from "../src/context/theme"; // This import is correct
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: rootReducer,
});

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* ✅ The ThemeProvider now wraps your application */}
      <ThemeProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <App />
        </GoogleOAuthProvider>
      </ThemeProvider>
      <Toaster />
    </BrowserRouter>
  </Provider>
);
