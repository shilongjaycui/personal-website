import React from 'react';

export default function NavItem(props) {
    return (
        <div className="w-56 h-10 font-piazzolla text-white text-3xl align-center">{props.label}</div>
    )
}