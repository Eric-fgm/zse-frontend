import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail, setCurrentStep } from "features/mailer/mailerSlice";
import RecipientStep from "features/mailer/components/RecipientStep";
import TopicStep from "features/mailer/components/TopicStep";
import SubmitStep from "features/mailer/components/SubmitStep";
import Icon from "components/Icon/Icon";
import Stack from "components/Stack/Stack";
import Stepper from "components/Stepper/Stepper";
import Scroller from "components/Scroller/Scroller";
import Typography from "components/Typography/Typography";
import SolidSend from "icons/SolidSend";
import SolidBackArrow from "icons/SolidBackArrow";
import { RootState } from "app/store/store";

export interface IMailerProps {}

const Mailer: React.FC<IMailerProps> = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const animationClass = useRef("");
  const formRef = useRef<HTMLFormElement>(null);

  const currentStep = useSelector(
    (state: RootState) => state.mailer.currentStep
  );

  const navigateToBack = () => {
    navigate(-1);
  };

  const navigateToNextStep = () => {
    animationClass.current = "slide-in";
    dispatch(setCurrentStep("+"));
  };

  const navigateToPrevStep = () => {
    animationClass.current = "slide-out";
    dispatch(setCurrentStep("-"));
  };

  // const registerInput = (name: keyof IFormState) => {
  //   const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setFormState((prevFormState) => {
  //       return { ...prevFormState, [name]: event.target.value };
  //     });
  //   };
  //   return { value: formState[name], onChange };
  // };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (currentStep === 2) {
      dispatch(sendEmail());
      return;
    }
    navigateToNextStep();
  };

  return (
    <Stack
      y="stretch"
      direction="column"
      className="fixed top-0 left-0 flex-col-reverse w-full h-full bg-elevation-primary fade md:flex-col"
    >
      <Stack
        x="center"
        className="sticky pt-5 top-0 flex-shrink-0 h-18 bg-elevation-primary border-t border-modifier-primary md:pb-0 md:pt-4 md:border-b"
      >
        <Icon
          content={<SolidBackArrow />}
          className="fixed top-4 left-5"
          interactive
          onClick={navigateToBack}
        />
        <Stepper
          activeIndex={currentStep}
          steps={[{ text: "Adresat" }, { text: "Temat" }, { text: "Wyślij" }]}
          onChange={(index) => {
            animationClass.current = "slide-out";
            dispatch(setCurrentStep(index));
          }}
        />
      </Stack>
      <Scroller className="pt-12 pb-6 md:pb-9 md:pt-20">
        <Stack x="start" y="center" direction="column">
          <SolidSend width={48} height={48} />
          <Typography className="mt-4 text-xl text-center">
            Prześlij email w szybki sposób
          </Typography>
          <Typography.Paragraph className="mt-2 max-w-120 text-md text-center font-normal">
            Zarządzaj swoimi danymi, prywatnością i bezpieczeństwem, by jak
            najlepiej wykorzystać możliwości, które daje Google.
          </Typography.Paragraph>
        </Stack>
        <form ref={formRef} className="relative" onSubmit={handleSubmit}>
          <RecipientStep
            className={animationClass.current}
            isActive={currentStep === 0}
          />
          <TopicStep
            className={animationClass.current}
            isActive={currentStep === 1}
            onBack={navigateToPrevStep}
          />
          <SubmitStep
            className={animationClass.current}
            isActive={currentStep === 2}
            onBack={navigateToPrevStep}
          />
        </form>
      </Scroller>
    </Stack>
  );
};

export default Mailer;
