import React from "react";

export interface IDropzoneProps {
  visible: boolean;
}

const Dropzone: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    IDropzoneProps
> = ({ visible, ...props }) => {
  return (
    <div
      style={{ display: visible ? "block" : "none" }}
      className="fixed top-0 left-0 w-full h-full bg-primary opacity-40 z-40"
    >
      <input
        type="file"
        name=""
        id=""
        className="absolute top-0 left-0 w-full h-full opacity-0"
        multiple
        maxLength={10}
        {...props}
      />
    </div>
  );
};

export default Dropzone;
