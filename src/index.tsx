import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./router";
import reportWebVitals from "./reportWebVitals";
import generateStore from "./redux";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "react-lazy-load-image-component/src/effects/blur.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={generateStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
