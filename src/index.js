import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { TrackerContextProvider } from "./contexts/TrackerContext";
import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
  <SpeechProvider appId="APP_ID" language="en-US">
    <TrackerContextProvider>
      <App />
    </TrackerContextProvider>
  </SpeechProvider>,
  document.getElementById("root")
);
