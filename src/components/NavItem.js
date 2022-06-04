import React from 'react';

export default function NavItem(props) {
    return (
        <a 
            className="flex justify-center items-center 
                w-56 h-24 
                font-piazzolla text-white text-3xl 
                hover:bg-stroke bg-local" 
            href={props.url}
        >
            {props.label}
        </a>
    )
}