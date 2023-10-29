import React from "react";
import "./App.css";
import Header from "./components/Header"

function App() {
  return (
    <div className="relative w-screen h-screen">
      <Header hideNavMenu={false} />
      <div className="absolute z-0 w-full h-full
                      bg-cyborg bg-top bg-cover"
      ></div>
    </div>
  );
}

export default App;
