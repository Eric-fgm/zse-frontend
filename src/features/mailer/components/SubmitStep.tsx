import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import Input from "components/Input/Input";
import Stack from "components/Stack/Stack";
import SubmitButton from "components/SubmitButton/SubmitButton";
import Typography from "components/Typography/Typography";
import FilePickerModal from "components/FilePickerModal/FilePickerModal";
import { useSelector } from "react-redux";
import { selectFormData } from "../mailerSlice";
import { RootState } from "app/store/store";
import useRegisterInput from "../hooks/useRegisterInput";

export interface ISubmitStepProps {
  isActive: boolean;
  onBack: () => void;
}

const SubmitStep: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > &
    ISubmitStepProps
> = ({ isActive, onBack, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { attachments } = useSelector(selectFormData);
  const isLoading = useSelector(
    ({ mailer }: RootState) => mailer.status === "pending"
  );

  const [isModalOpened, setModalOpened] = useState(false);

  const handleModalOpen = () => setModalOpened(true);

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
            placeholder="Treść"
            focus
            {...useRegisterInput("content")}
          />
          <Typography.Span
            className="mt-1.5 inline-block text-primary text-rg cursor-pointer"
            onClick={handleModalOpen}
          >
            Dołącz plik{": " + attachments.length}
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
            <SubmitButton text="Wyślij" isLoading={isLoading} />
          </Stack>
        </div>
        <FilePickerModal
          isOpen={isModalOpened}
          setIsOpen={setModalOpened}
          {...useRegisterInput("attachments")}
        />
      </Stack>
    </CSSTransition>
  );
};

export default SubmitStep;
