import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./components/store/store.js";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider
    clientId="559369165475-9pe8jjekq42vqf7lsc4sa37gna88hj29.apps.googleusercontent.com"
    clientSecret="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"
  >
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();
