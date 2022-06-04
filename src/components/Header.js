import React from 'react';
import NavItem from './NavItem';

export default function Header() {
    return (
        <div className="flex items-center p-4 h-40 bg-red-800 shadow-2xl shadow-black opacity-95">
            <h1 className="w-64 h-16 font-piazzolla text-white text-6xl font-bold">Jay Cui</h1>
            <NavItem label='About'/>
            <NavItem label='Blog'/>
            <NavItem label='Projects↓'/>
            <NavItem label='LinkedIn'/>
            <NavItem label='GitHub'/>
            <NavItem label='Resume'/>
        </div>
    )
}