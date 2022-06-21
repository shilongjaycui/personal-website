import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import ProjectWindow from "./ProjectWindow";
import resume from "../documents/jay_cui_spring_2022.pdf";

export default function NavMenu() {
  const [showProjects, setShowProjects] = useState(false);
  const updateShowProjects = () => {
    setShowProjects((prevState) => {
      return !prevState;
    });
  };
  return (
    <div
      className="absolute flex MacBook:flex-col iPad:flex-row iPhone:flex-row
                    MacBook:w-full MacBook:h-1/3 iPad:w-full iPad:h-full iPhone:w-full iPhone:h-full"
    >
      <div
        className="bg-red-800 opacity-75 
                    MacBook:w-full MacBook:h-1/2 iPad:w-1/2 iPad:h-full iPhone:w-1/2 iPhone:h-full
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
        <div
          className="absolute MacBook:top-1/2 iPad:left-1/2 iPhone:left-1/2 
                        MacBook:w-full MacBook:h-full iPad:w-1/2 iPad:h-full iPhone:w-1/2 iPhone:h-full
                        flex MacBook:flex-row iPad:flex-col iPhone:flex-col justify-center items-center
                        z-20"
        >
          <ProjectWindow
            name="Music"
            description="We're under construction. Please come back later."
          />
          <ProjectWindow
            name="N/A"
            description="N/A"
          />
        </div>
      )}
    </div>
  );
}
