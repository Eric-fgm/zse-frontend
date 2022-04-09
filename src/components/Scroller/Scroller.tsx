import React from "react";

export interface IScrollerProps {
  thin?: boolean;
}

const Scroller: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    IScrollerProps
> = ({ children, thin = false, className = "" }) => {
  return (
    <div
      className={`pl-4 h-full overflow-y-scroll scroller${
        thin ? "-thin" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Scroller;
