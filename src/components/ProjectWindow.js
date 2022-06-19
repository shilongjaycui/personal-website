import React from "react";

export default function ProjectWindow(props) {
  return (
    <div
      className="flex flex-col rounded-md border-2 border-black shadow-inner
                    MacBook:w-1/4 MacBook:h-2/3 iPad:w-2/3 iPad:h-1/3 iPhone:w-2/3 iPhone:h-1/3
                    bg-white opacity-50 hover:opacity-100
                    m-6"
    >
      <div
        className="flex justify-center items-center
                    w-full h-1/2
                    font-piazzolla font-bold text-black text-3xl"
      >
        {props.name}
      </div>
      <div
        className="flex justify-center items-center
                    w-full h-1/2
                    font-piazzolla text-black"
      >
        {props.description}
      </div>
    </div>
  );
}
