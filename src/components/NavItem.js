import React from 'react';

export default function NavItem(props) {
    return (
        <div className="flex justify-center items-center w-56 h-24 font-piazzolla text-center text-white text-3xl hover:bg-stroke bg-local">{props.label}</div>
    )
}