import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import useRegisterInput from "features/mailer/hooks/useRegisterInput";
import Input from "components/Input/Input";
import Stack from "components/Stack/Stack";
import SubmitButton from "components/SubmitButton/SubmitButton";
import Typography from "components/Typography/Typography";

export interface ITopicStepProps {
  isActive: boolean;
  onBack: () => void;
}

const TopicStep: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    ITopicStepProps
> = ({ isActive, onBack, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <CSSTransition
      in={isActive}
      classNames="animation"
      timeout={500}
      unmountOnExit
    >
      <Stack x="center" y="center" direction="column" {...props}>
        <div className="mt-9 max-w-90">
          <Input
            ref={inputRef}
            placeholder="Temat"
            required
            focus
            {...useRegisterInput("topic")}
          />
          <Typography.Span className="mt-1.5 inline-block text-primary text-rg cursor-pointer">
            Zobacz zapisane tematy
          </Typography.Span>
          <Typography.Paragraph className="mt-9 text-rg font-normal">
            Zarządzaj swoimi danymi, prywatnością i bezpieczeństwem, by jak
            najlepiej wykorzystać możliwości, które daje Google.
          </Typography.Paragraph>
          <Stack x="between" y="center" className="mt-4">
            <Typography.Span
              className="text-primary text-rg cursor-pointer"
              onClick={onBack}
            >
              Wstecz
            </Typography.Span>
            <SubmitButton text="Dalej" />
          </Stack>
        </div>
      </Stack>
    </CSSTransition>
  );
};

export default TopicStep;
