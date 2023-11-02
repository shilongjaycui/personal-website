import React from "react";

interface ProjectWindowProps {
  name: string;
  description: string;
}

export default function ProjectWindow(props: ProjectWindowProps) {
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
                    font-piazzolla font-bold text-black MacBook:text-3xl iPad:text-2xl iPhone:text-base"
      >
        {props.name}
      </div>
      <div
        className="flex justify-center items-center
                    w-full h-1/2 MacBook:p-6 iPad:p-6 iPhone:p-3
                    font-piazzolla text-black MacBook:text-2xl iPad:text-xl iPhone:text-sm"
      >
        {props.description}
      </div>
    </div>
  );
}
