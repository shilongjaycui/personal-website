import "./App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavMenu from "./components/NavMenu";
import list from "./images/home/list.png";
import cyborg_commando from "./images/home/cyborg_commando.png";

function App() {
  const MACBOOK_MIN_WIDTH = 1200
  const [showNavMenu, setShowNavMenu] = useState(window.innerWidth >= MACBOOK_MIN_WIDTH)
  const [listIconClicked, setListIconClicked] = useState(false)
  const [showProjects, setShowProjects] = useState(false)
  const updateShowProjects = () => {
    setShowProjects((prevState) => {
      console.log('showProjects (before):', prevState)
      console.log('showProjects (after):', !prevState)
      return !prevState
    })
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= MACBOOK_MIN_WIDTH) {
        setListIconClicked(false)
      }
      setShowNavMenu((window.innerWidth >= MACBOOK_MIN_WIDTH) || listIconClicked)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  })

  return (
    <div className="w-screen h-screen">
      <div className="bg-red-800 w-full h-1/6 flex flex-row relative shadow-2xl shadow-black">
        <img
          src={list}
          alt="list"
          className="MacBook:h-0 iPad:h-1/3 iPhone:h-1/3 absolute left-10 flex ml-auto inset-y-1/3 cursor-pointer"
          onClick={() => setListIconClicked((prevState) => {
            return !prevState
          })}
        />
        <Link to="/" className="w-full h-full flex justify-center items-center cursor-auto">
          <h1 className="font-piazzolla text-white text-6xl font-bold hover:text-black cursor-pointer">
            Jay Cui
          </h1>
        </Link>
      </div>
      <div className="relative h-5/6">
        {showNavMenu && (<NavMenu updateShowProjects={updateShowProjects}/>)}
        <img src={cyborg_commando} alt={"大佬"} className="absolute z-0" onClick={() => {  // TODO: fix this
          updateShowProjects()
        }}/>
      </div>
    </div>
  );
}

export default App;
