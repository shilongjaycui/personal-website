import React, { useState, useEffect } from "react";
import list from "../images/home/list.png";
import { Link } from "react-router-dom";
import NavMenu from "./NavMenu";

export default function Header() {
  const MACBOOK_MIN_WIDTH = 1200;
  const [showNavMenu, setShowNavMenu] = useState(
    window.innerWidth >= MACBOOK_MIN_WIDTH
  );
  const [listIconClicked, setListIconClicked] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= MACBOOK_MIN_WIDTH) {
        setListIconClicked(false);
      }
      setShowNavMenu(window.innerWidth >= MACBOOK_MIN_WIDTH || listIconClicked);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });
  return (
    <>
      <div className="bg-red-800 w-full h-1/6 flex flex-row relative shadow-2xl shadow-black">
        <img
          src={list}
          alt="list"
          className="MacBook:h-0 iPad:h-1/3 iPhone:h-1/3 absolute left-10 flex ml-auto inset-y-1/3 cursor-pointer"
          onClick={() =>
            setListIconClicked((prevState) => {
              return !prevState;
            })
          }
        />
        <div
          className="w-full h-full flex justify-center items-center"
        >
          <Link to="/" className="font-piazzolla text-white text-6xl font-bold hover:text-black cursor-pointer">
            Jay Cui
          </Link>
        </div>
      </div>
      {showNavMenu && <NavMenu />}
    </>
  );
}
