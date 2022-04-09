import Icon from "components/Icon/Icon";
import SolidMicrophone from "icons/SolidMicrophone";
import SolidSearch from "icons/SolidSearch";
import React from "react";

export interface ISearchInputProps {}

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    ISearchInputProps
>(({ id, type = "text", className, ...props }, ref) => {
  return (
    <div className="flex items-center w-full">
      <label htmlFor={id}>
        <Icon content={<SolidSearch />} size={48} type="dark" interactive />
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        className={`w-full h-12 text-md bg-transparent outline-none placeholder:text-content-tertiary ${className}`}
        autoComplete="off"
        {...props}
      />
      <div>
        <Icon content={<SolidMicrophone />} size={48} type="dark" interactive />
      </div>
    </div>
  );
});

export default SearchInput;
