import React, { useMemo } from "react";

export interface IStackProps {
  x?: "center" | "start" | "end" | "between" | "stretch";
  y?: "center" | "start" | "end" | "stretch";
  spacing?: number;
  direction?: "row" | "column";
  className?: string;
}

const Stack: React.FC<IStackProps> = ({
  children,
  x = "start",
  y = "start",
  spacing = 4,
  direction = "row",
  className = "",
  ...props
}) => {
  // we can`t just do justfy-${x}, because of tailwind issue
  const horizontalAndVerticalPositions = useMemo(() => {
    return `${direction === "column" ? "flex-col" : ""} ${
      x !== "between" || "justify-between"
    } ${x !== "center" || "justify-center"} ${y !== "start" || "items-start"} ${
      y !== "center" || "items-center"
    } ${y !== "end" || "items-end"} ${y !== "stretch" || "items-stretch"}`;
  }, [x, y, direction]);

  return (
    <div
      style={{ gap: spacing }}
      className={`flex ${horizontalAndVerticalPositions} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Stack;
