import React from "react";
import ReactDOM from "react-dom";
import App from "./screens/App";
import { makeServer } from "./server";
import _ from "lodash";

if (_.toLower(process.env.REACT_APP_ENABLE_MOCK_SERVER) === "true") {
  makeServer({ environment: "development" });
}

ReactDOM.render(<App />, document.getElementById("root"));
