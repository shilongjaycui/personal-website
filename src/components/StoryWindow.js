import React from 'react';

export default function StoryWindow(props) {
    return (
        <div className='p-16'>
            <img src={props.src} className='w-64 h-auto rounded-3xl'/>
            <div className='w-64 h-16 font-piazzolla text-3xl font-bold text-center text-white flex justify-center items-center'>{props.label}</div>
        </div>
    )
}