import React, { useEffect } from "react";

export interface IInputProps {
  focus?: boolean;
}

const Input = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    IInputProps
>(({ focus, type, ...props }, ref) => {
  useEffect(() => {
    // @ts-ignore
    if (focus && ref && ref.current) {
      // @ts-ignore
      ref.current.focus();
    }
  }, []);

  return (
    <input
      ref={ref}
      type={type}
      className="px-4 w-full h-13 text-full bg-transparent border border-modifier-primary rounded outline-none placeholder:text-content-tertiary"
      {...props}
    />
  );
});

export default Input;
