import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/index";
import { ThemeProvider } from "../src/context/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: rootReducer,
});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
          <App />
      </ThemeProvider>
      <Toaster />
    </BrowserRouter>
  </Provider>
);
