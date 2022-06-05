import React from 'react';
import CollapsibleNavItem from './CollapsibleNavItem';
import NavItem from './NavItem';

export default function Header() {
    return (
        <div className="flex items-center p-4 h-40 bg-red-800 shadow-2xl shadow-black opacity-95">
            <h1 className="w-64 h-16 font-piazzolla text-white text-6xl font-bold hover:uppercase">Jay Cui</h1>
            <NavItem label='About'/>
            <NavItem label='Blog' url='https://medium.com/@shilongjaycui'/>
            <CollapsibleNavItem className="overflow-visible" label='Projects' items={['Music', 'Dating', 'Reading']}/>
            <NavItem label='LinkedIn' url='https://www.linkedin.com/in/shilongjaycui/'/>
            <NavItem label='GitHub' url='https://github.com/shilongjaycui'/>
            <NavItem label='Resume'/>
        </div>
    )
}