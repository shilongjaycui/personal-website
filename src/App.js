import React from "react";
import "./App.css";
import Header from "./components/Header"
import cyborg_commando from "./images/home/cyborg_commando.png";

function App() {
  return (
    <div className="relative w-screen h-screen">
      <Header />
      <img src={cyborg_commando} alt={"大佬"} className="absolute z-0" />
    </div>
  );
}

export default App;
