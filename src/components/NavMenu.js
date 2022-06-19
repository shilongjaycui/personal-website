import React from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import CollapsibleNavItem from "./CollapsibleNavItem";
import resume from "../documents/jay_cui_spring_2022.pdf";

export default function NavMenu() {
  return (
    <div
      className="absolute bg-red-800 
            MacBook:w-full MacBook:h-1/6 iPad:w-1/2 iPad:h-full iPhone:w-1/2 iPhone:h-full 
            z-10 flex justify-center items-center
            MacBook:flex-row iPad:flex-col iPhone:flex-col"
    >
      <Link to="/about">
        <NavItem label="About" />
      </Link>
      <NavItem label="Blog" url="https://medium.com/@shilongjaycui" />
      <CollapsibleNavItem
        label="Projects"
        items={["Music", "Dating", "Reading"]}
      />
      <NavItem
        label="LinkedIn"
        url="https://www.linkedin.com/in/shilongjaycui/"
      />
      <NavItem label="GitHub" url="https://github.com/shilongjaycui" />
      <NavItem label="Resume" url={resume} />
    </div>
  );
}
