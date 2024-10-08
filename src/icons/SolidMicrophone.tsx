import React from "react";

const SolidMicrophone: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
        d="M12 16C14.206 16 16 14.206 16 12V6C16 3.783 14.215 1.979 12.021 1.979C11.9506 1.97943 11.8805 1.98781 11.812 2.004C10.7853 2.05378 9.81693 2.49636 9.10738 3.24016C8.39783 3.98395 8.00136 4.97205 8 6V12C8 14.206 9.794 16 12 16Z"
        fill="currentColor"
      />
      <path
        d="M11 19.931V22H13V19.931C16.939 19.436 20 16.073 20 12H18C18 15.309 15.309 18 12 18C8.691 18 6 15.309 6 12H4C4 16.072 7.061 19.436 11 19.931Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SolidMicrophone;
