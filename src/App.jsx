import React from "react";
import ChatBot from "./components/ChatBot";
import { Global, css } from "@emotion/react";

function App() {
  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600&display=swap");

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: "Hind Siliguri", sans-serif;
            background: #121212;
            color: white;
            line-height: 1.6;
            height: 100vh;
            overflow: hidden;
          }

          ::selection {
            background: #4a4af7;
            color: white;
          }
        `}
      />
      <ChatBot />
    </>
  );
}

export default App;
