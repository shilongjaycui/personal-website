import "./App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import NavItem from "./components/NavItem";
import CollapsibleNavItem from './components/CollapsibleNavItem';
import list from "./images/home/list.png";
import cyborg_commando from "./images/home/cyborg_commando.png";
import resume from './documents/jay_cui_spring_2022.pdf';

function App() {
  return (
    <div className="w-screen h-screen">
      <div className="bg-red-800 w-full h-1/6 flex flex-row relative shadow-2xl shadow-black">
        <img
          src={list}
          alt="list"
          className="MacBook:h-0 iPad:h-1/3 iPhone:h-1/3 absolute left-10 flex ml-auto inset-y-1/3"
        />
        <Link to="/" className="w-full h-full flex justify-center items-center">
          <h1 className="font-piazzolla text-white text-6xl font-bold hover:text-black">
            Jay Cui
          </h1>
        </Link>
      </div>
      <div className="relative h-5/6">
        <div className="absolute bg-red-800 
          MacBook:w-full MacBook:h-1/6 iPad:w-1/2 iPad:h-full iPhone:w-1/2 iPhone:h-full 
          z-10 flex justify-center items-center
          MacBook:flex-row iPad:flex-col iPhone:flex-col"
        >
          <Link to="/about">
            <NavItem label='About'/>
          </Link>
          <NavItem label='Blog' url='https://medium.com/@shilongjaycui'/>
          <CollapsibleNavItem label='Projects' items={['Music', 'Dating', 'Reading']}/>
          <NavItem label='LinkedIn' url='https://www.linkedin.com/in/shilongjaycui/'/>
          <NavItem label='GitHub' url='https://github.com/shilongjaycui'/>
          <NavItem label='Resume' url={resume}/>
        </div>
        <img src={cyborg_commando} alt={"大佬"} className="absolute z-0" />
      </div>
    </div>
  );
}

export default App;
