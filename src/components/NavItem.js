import React from 'react';

export default function NavItem(props) {
    return (
        <a 
            className="flex justify-center items-center 
                w-36 h-16
                m-2
                font-piazzolla text-white text-3xl 
                hover:bg-stroke hover:bg-contain" 
            href={props.url}
        >
            {props.label}
        </a>
    )
}