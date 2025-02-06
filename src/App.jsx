import React, { useEffect } from "react";
import ChatBot from "./components/ChatBot";
import { Global, css } from "@emotion/react";

function App() {
  useEffect(() => {
    // Debounce function
    const debounce = (fn, ms) => {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), ms);
      };
    };

    // Set all height variables
    const setHeightVariables = () => {
      // Viewport height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      // Header and input area heights
      const header = document.querySelector(".chat-header");
      const inputArea = document.querySelector(".input-area");

      if (header && inputArea) {
        const headerHeight = header.offsetHeight;
        const inputAreaHeight = inputArea.offsetHeight;

        document.documentElement.style.setProperty(
          "--header-height",
          `${headerHeight}px`
        );
        document.documentElement.style.setProperty(
          "--input-height",
          `${inputAreaHeight}px`
        );
      }
    };

    // Debounced version of setHeightVariables
    const debouncedSetHeights = debounce(setHeightVariables, 250);

    // Initial setup
    // Wait for DOM to be ready
    setTimeout(setHeightVariables, 0);

    // Update on resize and orientation change
    window.addEventListener("resize", debouncedSetHeights);
    window.addEventListener("orientationchange", setHeightVariables);

    // Cleanup
    return () => {
      window.removeEventListener("resize", debouncedSetHeights);
      window.removeEventListener("orientationchange", setHeightVariables);
    };
  }, []);

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
            height: 100vh; /* Fallback */
            height: calc(var(--vh, 1vh) * 100);
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
