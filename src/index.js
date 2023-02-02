import React from "react";
import ReactDOM from "react-dom/client";
// Provider Imports
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Provider } from "react-redux";
// Component Imports
import App from "./App";
import store from "./store/store";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/style.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider position="top-center" zIndex={2077}>
            <App />
          </NotificationsProvider>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
