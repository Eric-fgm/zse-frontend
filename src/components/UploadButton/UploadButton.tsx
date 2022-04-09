import React from "react";

export interface IUploadButtonProps {
  text: string;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadButton: React.FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    IUploadButtonProps
> = ({ text, onFileChange, ...props }) => {
  return (
    <button
      className="relative px-3 py-2 text-sm text-primary font-medium tracking-wider rounded-lg overflow-hidden hover:bg-elevation-hover"
      tabIndex={-1}
      {...props}
    >
      {text}
      <input
        type="file"
        max={10}
        multiple
        className="absolute top-0 left-0 w-full h-full opacity-0"
        {...(onFileChange && { onChange: onFileChange })}
      />
    </button>
  );
};

export default UploadButton;
