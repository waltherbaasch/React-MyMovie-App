import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [darkmode, setDarkmode] = useState(false);

  // Define a class for the root element based on the dark mode state
  const rootClass = darkmode ? "app dark" : "app";

  // Define inline styles for dark mode
  const darkModeStyles = {
    backgroundColor: "#000", // Black background when dark mode is on
    color: "#fff", // White text when dark mode is on
  };

  return (
    <div className={rootClass} style={darkmode ? darkModeStyles : null}>
      <div className="dark:bg-black">
        <Outlet context={[darkmode, setDarkmode]} />
      </div>
    </div>
  );
}

export default App;
