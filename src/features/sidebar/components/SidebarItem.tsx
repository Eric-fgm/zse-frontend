import React from "react";
import { NavLink } from "react-router-dom";

export interface ISidebarItemProps {
  to: string;
  icon: JSX.Element;
  text: string;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({ to = "/", icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-4 flex items-center h-11 rounded-lg whitespace-nowrap ${
          isActive
            ? "text-content-active bg-elevation-active pointer-events-none"
            : "text-content-normal hover:text-content-hover hover:bg-elevation-hover"
        }`
      }
    >
      <span className="mr-4">{icon}</span>
      <span className="flex-1 text-sm">{text}</span>
    </NavLink>
  );
};

export default SidebarItem;
