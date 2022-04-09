import { RootState } from "app/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ISendEmailPayload } from "../api/sendEmail";
import { changeField } from "../mailerSlice";

export interface IUseRegisterInputOptions {}

export default function useRegisterInput(
  name: keyof ISendEmailPayload,
  options: IUseRegisterInputOptions = {}
) {
  const dispatch = useDispatch();
  const value = useSelector(({ mailer }: RootState) => mailer[name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeField({ name, value: e.target.value }));
  };

  return { value, onChange: handleChange };
}
