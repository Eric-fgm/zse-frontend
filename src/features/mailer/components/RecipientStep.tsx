import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import Input from "components/Input/Input";
import Stack from "components/Stack/Stack";
import Typography from "components/Typography/Typography";
import SubmitButton from "components/SubmitButton/SubmitButton";
import useRegisterInput from "../hooks/useRegisterInput";

export interface IRecipientStepProps {
  isActive: boolean;
}

const RecipientStep: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    IRecipientStepProps
> = ({ isActive, onSubmit, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <CSSTransition
      in={isActive}
      classNames="animation"
      timeout={500}
      unmountOnExit
    >
      <Stack x="start" y="center" direction="column" {...props}>
        <div className="mt-9 max-w-90">
          <Input
            ref={inputRef}
            placeholder="Adresat"
            required
            focus
            {...useRegisterInput("recipient")}
          />
          <Typography.Span className="mt-1.5 inline-block text-primary text-rg cursor-pointer">
            Zobacz zapisane adresy
          </Typography.Span>
          <Typography.Paragraph className="mt-9 text-rg font-normal">
            Zarządzaj swoimi danymi, prywatnością i bezpieczeństwem, by jak
            najlepiej wykorzystać możliwości, które daje Google.
          </Typography.Paragraph>
          <Stack x="between" y="center" className="mt-4">
            <Typography.Span className="text-primary text-rg cursor-pointer">
              Zapisz adresata
            </Typography.Span>
            <SubmitButton text="Dalej" />
          </Stack>
        </div>
      </Stack>
    </CSSTransition>
  );
};

export default RecipientStep;
