import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import { RoomProvider } from "./context";

ReactDOM.render(
  <React.StrictMode>
    <RoomProvider>
      <App />
    </RoomProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
