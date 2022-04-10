import React, { useCallback, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Icon from "components/Icon/Icon";
import SolidMicrophone from "icons/SolidMicrophone";
import SolidSearch from "icons/SolidSearch";
import SolidRecognition from "icons/SolidRecognition";

export interface ISearchInputProps {}

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
    ISearchInputProps
>(({ id, type = "text", className, onChange, ...props }, ref) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (listening)
      onChange &&
        onChange({
          target: { value: transcript },
        } as React.ChangeEvent<HTMLInputElement>);
  }, [transcript]);

  const handleSpeechRecognition = useCallback(() => {
    if (listening) {
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      SpeechRecognition.startListening({ language: "pl-PL" });
    }
  }, [resetTranscript, listening]);

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
        onChange={onChange}
        {...props}
      />
      {browserSupportsSpeechRecognition && (
        <div>
          <Icon
            content={listening ? <SolidRecognition /> : <SolidMicrophone />}
            size={48}
            type="dark"
            interactive
            onClick={handleSpeechRecognition}
          />
        </div>
      )}
    </div>
  );
});

export default SearchInput;
