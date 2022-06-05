import React from 'react';

export default function DropdownItem(props) {
    return (
        <div 
            className="flex justify-center items-center rounded-md border-2 border-black shadow-inner
                w-56 h-14 
                font-piazzolla font-bold text-black text-3xl 
                bg-white bg-local
                hover:text-white hover:bg-black"
        >
            {props.label}
        </div>
    )
}