import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendEmailApi, ISendEmailPayload } from "features/mailer/api/sendEmail";
import { RootState } from "app/store/store";

const initialState: {
  recipient: string;
  topic: string;
  content: string;
  attachments: string[];
  currentStep: number;
  status: "idle" | "pending" | "error";
} = {
  recipient: "",
  topic: "",
  content: "",
  attachments: [],
  currentStep: 0,
  status: "idle",
};

export const sendEmail = createAsyncThunk(
  "mailer/sendEmail",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { status, currentStep, ...payload } = (getState() as RootState)
        .mailer;
      const response = await sendEmailApi(payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const mailerSlice = createSlice({
  name: "mailer",
  initialState,
  reducers: {
    setCurrentStep: (state, { payload }: PayloadAction<number | "+" | "-">) => {
      if (payload === "+") state.currentStep += 1;
      else if (payload === "-") state.currentStep -= 1;
      else state.currentStep = payload;
    },
    changeField: (
      state,
      { payload }: PayloadAction<{ name: keyof ISendEmailPayload; value: any }>
    ) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendEmail.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(sendEmail.fulfilled, (state) => {
      Object.assign(state, mailerSlice.getInitialState());
    });
    builder.addCase(sendEmail.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const selectFormData = ({ mailer }: RootState) => {
  const { status, currentStep, ...fields } = mailer;
  return fields;
};

export const { setCurrentStep, changeField } = mailerSlice.actions;
export default mailerSlice.reducer;
