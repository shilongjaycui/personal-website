import React from 'react';
import useCollapse from 'react-collapsed';
import DropdownItem from './DropdownItem';

export default function CollapsibleNavItem(props) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
    const items = props.items;
    return (
        <div className="relative">
            <div 
                className="flex justify-center items-center
                    w-48 h-24
                    font-piazzolla text-white text-3xl
                    hover:bg-stroke hover:bg-local"
                {...getToggleProps()}
            >
                {props.label}
                <div className="absolute right-6">{isExpanded ? '↑' : '↓'}</div>
            </div>
            <div className="absolute top-20" {...getCollapseProps()}>
                {items.map(item => (<DropdownItem label={item} />))}
            </div>
        </div>
    )
}