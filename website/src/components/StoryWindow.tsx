import React from "react";

interface StoryWindowProps {
  src: any;
  label: string;
  onLaptop: boolean;
}

export default function StoryWindow(props: StoryWindowProps) {
  return (
    <>
      {props.onLaptop ? (
        <div className="flex-column w-1/5 p-6">
          <img src={props.src} alt={props.label} className="rounded-3xl p-3" />
          <div
            className="font-piazzolla font-bold text-center text-white text-3xl"
          >
            {props.label}
          </div>
        </div>
      ) : (
        <div className="flex-column w-1/3 p-6">
          <img src={props.src} alt={props.label} className="rounded-3xl p-3" />
          <div
            className="font-piazzolla font-bold text-center text-white iPad:text-2xl iPhone:text-base"
          >
            {props.label}
          </div>
        </div>
      )}
    </>
  );
}
