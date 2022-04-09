import React from "react";

export interface IIconProps {
  content: JSX.Element;
  size?: number;
  type?: "light" | "dark";
  interactive?: boolean;
  className?: string;
}

const Icon: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    IIconProps
> = ({
  content,
  size = 36,
  type = "light",
  interactive = false,
  className = "",
  ...props
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`flex items-center justify-center ${
        interactive
          ? `cursor-pointer ${
              type === "light"
                ? "hover:text-content-hover"
                : "hover:text-content-secondary"
            }`
          : ""
      } ${
        type === "light" ? "text-content-secondary" : "text-content-tertiary"
      } ${className}`}
      {...props}
    >
      {content}
    </div>
  );
};

export default Icon;
