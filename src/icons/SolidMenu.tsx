import React from "react";

const SolidMenu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      focusable="false"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      fill="currentColor"
      {...props}
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
    </svg>
  );
};

export default SolidMenu;
