import React from "react";
import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";

export interface IStepperProps {
  activeIndex: number;
  steps: { text: string; active?: boolean }[];
  onChange?: (index: number) => void;
}

const Stepper: React.FC<IStepperProps> = ({ activeIndex, steps, onChange }) => {
  const isActive = (index: number) => {
    return index <= activeIndex;
  };

  const handleClick = (index: number) => () => {
    isActive(index) && onChange && onChange(index);
  };

  return (
    <Stack x="between" y="center" className="px-6 w-96">
      {steps.map(({ text }, index) => (
        <React.Fragment key={index}>
          {index !== 0 && (
            <div
              className={`mx-4 flex-1 h-px ${
                isActive(index) ? "bg-primary" : "bg-content-normal"
              }`}
            ></div>
          )}
          <div
            className={`relative flex items-center justify-center text-xs w-5 h-5 rounded-full ${
              isActive(index)
                ? "bg-primary cursor-pointer"
                : "text-elevation-primary bg-content-normal cursor-default"
            }`}
            onClick={handleClick(index)}
          >
            {index + 1}
            <Typography.Span
              className={`absolute pt-1 top-full ${
                isActive(index) ? "text-primary" : "text-content-normal"
              }`}
            >
              {text}
            </Typography.Span>
          </div>
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default Stepper;
