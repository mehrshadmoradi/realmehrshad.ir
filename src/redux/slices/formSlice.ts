import { FormState } from "@/app/[lang]/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: FormState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  message: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { updateForm, resetForm } = formSlice.actions;
export default formSlice.reducer;
