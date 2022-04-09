import React from "react";

export interface IChipProps {
  text: string;
  active?: boolean;
}

const Chip: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    IChipProps
> = ({ text, active = false, ...props }) => {
  return (
    <button
      className={`px-4 h-8 text-rg text-content-normal leading-8 border border-modifier-primary rounded-full ${
        active
          ? "text-content-active bg-elevation-active pointer-events-none"
          : "hover:bg-elevation-hover hover:text-content-hover"
      }`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Chip;
