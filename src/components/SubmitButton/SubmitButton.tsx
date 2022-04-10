import React from "react";
import Icon from "components/Icon/Icon";
import SolidLoader from "icons/SolidLoader";

export interface ISubmitButtonProps {
  text: string;
  isLoading?: boolean;
}

const SubmitButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ISubmitButtonProps
> = ({ text, className = "", isLoading = false, ...props }) => {
  return (
    <button
      className={`relative px-4 py-2 text-sm text-content-primary bg-primary rounded ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <Icon
          size={24}
          content={<SolidLoader width={24} height={24} />}
          className="absolute -mt-3 -ml-3 top-2/4 left-2/4"
        />
      )}
      <span className={`${isLoading ? "opacity-0" : ""}`}>{text}</span>
    </button>
  );
};

export default SubmitButton;
