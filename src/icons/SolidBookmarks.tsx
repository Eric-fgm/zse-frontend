import React from "react";

const SolidBookmarks: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M16.999 23V7C16.999 5.897 16.102 5 14.999 5H6.99902C5.89602 5 4.99902 5.897 4.99902 7V23L10.999 19.399L16.999 23Z"
        fill="currentColor"
      />
      <path
        d="M15.585 3H16.999C18.102 3 18.999 3.897 18.999 5V15.443L20.999 17.932V3C20.999 1.897 20.102 1 18.999 1H10.999C9.89602 1 8.99902 1.897 8.99902 3H15.585Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SolidBookmarks;
