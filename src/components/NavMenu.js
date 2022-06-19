import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import resume from "../documents/jay_cui_spring_2022.pdf";

export default function NavMenu() {
  const [showProjects, setShowProjects] = useState(false)
  const updateShowProjects = () => {
    setShowProjects((prevState) => {
      console.log('showProjects (before):', prevState)
      console.log('showProjects (after):', !prevState)
      return !prevState
    })
  }
  return (
    <>
      <div
        className="absolute bg-red-800 opacity-75
              MacBook:w-full MacBook:h-1/6 iPad:w-1/2 iPad:h-full iPhone:w-1/2 iPhone:h-full 
              z-10 flex justify-center items-center
              MacBook:flex-row iPad:flex-col iPhone:flex-col"
      >
        <Link to="/about">
          <NavItem label="About" />
        </Link>
        <NavItem label="Blog" url="https://medium.com/@shilongjaycui" />
        <NavItem
          label="Projects"
          items={["Music", "Dating"]}
          updateShowProjects={updateShowProjects}
        />
        <NavItem
          label="LinkedIn"
          url="https://www.linkedin.com/in/shilongjaycui/"
        />
        <NavItem label="GitHub" url="https://github.com/shilongjaycui" />
        <NavItem label="Resume" url={resume} />
      </div>
      {showProjects && (
        <div className="static w-full h-1/4 bg-white z-20"></div>
      )}
    </>
  );
}
