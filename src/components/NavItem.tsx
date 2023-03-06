import React from "react";

interface NavItemProps {
  label: string;
  items?: string[];
  url?: string | any;
  updateShowProjects?: () => void;
}

export default function NavItem(props: NavItemProps) {
  return (
    <a
      className="flex justify-center items-center 
                w-36 h-16
                m-2
                font-piazzolla text-white text-3xl font-bold
                hover:bg-stroke hover:bg-contain hover:cursor-pointer"
      href={props.url}
      onClick={() => {
        if (props.updateShowProjects) {
          props.updateShowProjects();
        }
      }}
    >
      {props.label}
    </a>
  );
}
