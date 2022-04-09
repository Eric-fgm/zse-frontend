import React from "react";
import SolidCheckbox from "icons/SolidCheckbox";
import SolidCheckboxChecked from "icons/SolidCheckboxChecked";

export interface ICheckboxInputProps {}

const CheckboxInput: React.FC<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    ICheckboxInputProps
> = ({ checked, ...props }) => {
  return (
    <div className="relative w-6 h-6">
      {checked ? (
        <SolidCheckboxChecked width={22} height={22} className="text-primary" />
      ) : (
        <SolidCheckbox
          width={22}
          height={22}
          className={`text-content-secondary`}
        />
      )}
      <input
        type="checkbox"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        checked={checked}
        {...props}
      />
    </div>
  );
};

export default React.memo(CheckboxInput);
