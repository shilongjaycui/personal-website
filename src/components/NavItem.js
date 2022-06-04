import React from 'react';
import stroke from '../images/home/stroke.png'  // downloaded from https://flyclipart.com/brush-stroke-transparent-background-white-brush-stroke-png-465374#

export default function NavItem(props) {
    return (
        <div className="w-56 h-10 font-piazzolla text-white text-3xl align-center bg-stroke">{props.label}</div>
    )
}