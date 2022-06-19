import React from 'react';
import useCollapse from 'react-collapsed';
import ProjectWindow from './ProjectWindow';

export default function CollapsibleNavItem(props) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const items = props.items;
    return (
        <div className="relative">
            <div 
                className="flex justify-center items-center
                    w-36 h-16
                    font-piazzolla text-white text-3xl
                    hover:bg-stroke hover:bg-contain"
                {...getToggleProps()}
            >
                {props.label}
            </div>
            <div className="absolute top-20" {...getCollapseProps()}>
                {items.map(item => (<ProjectWindow label={item} />))}
            </div>
        </div>
    )
}