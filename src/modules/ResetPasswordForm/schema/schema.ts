import * as Yup from "yup";
import {EMAIL_ERROR_TEXT, EMAIL_REG_EXP} from "../../../shared/common/config/validate";

export const resetPasswordFormSchema = Yup.object({
  email: Yup
    .string()
    .required('Email is required field')
    .matches(EMAIL_REG_EXP, EMAIL_ERROR_TEXT),
});
