import React from "react";
import ReactDOM from "react-dom";
import App from "./screens/App";
import { makeServer } from "./server";

if (process.env.REACT_APP_ENABLE_MOCK_SERVER) {
  makeServer({ environment: "development" });
}

ReactDOM.render(<App />, document.getElementById("root"));
