import React from 'react';

export default function NavItem(props) {
    return (
        <a 
            className="flex justify-center items-center 
                w-48 h-24 
                font-piazzolla text-white text-3xl 
                hover:bg-stroke hover:bg-auto" 
            href={props.url}
        >
            {props.label}
        </a>
    )
}