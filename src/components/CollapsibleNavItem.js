import React from 'react';
import useCollapse from 'react-collapsed';
import DropdownItem from './DropdownItem';

export default function CollapsibleNavItem(props) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const items = props.items;
    return (
        <>
            <div 
                className="flex justify-center items-center 
                    w-56 h-24 
                    font-piazzolla text-white text-3xl 
                    hover:bg-stroke bg-local"
                {...getToggleProps()}
            >
                {props.label} {isExpanded ? '↑' : '↓'}
            </div>
            <div {...getCollapseProps()}>
                {items.map(item => (<DropdownItem label={item} />))}
            </div>
        </>
    )
}