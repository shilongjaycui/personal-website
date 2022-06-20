import React from "react";

export default function StoryWindow(props) {
  return (
    <div className="flex-column w-1/5 p-6">
      <img
        src={props.src}
        alt={props.label}
        className="rounded-3xl p-3"
      />
      <div 
        className="font-piazzolla font-bold text-center text-white
            MacBook:text-3xl iPad:text-lg iPhone:text-xs"
      >
        {props.label}
      </div>
    </div>
  );
}
