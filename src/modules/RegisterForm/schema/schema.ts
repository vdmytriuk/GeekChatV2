import * as Yup from "yup";
import {
  EMAIL_ERROR_TEXT,
  EMAIL_REG_EXP,
  NAME_ERROR_TEXT,
  NAME_REG_EXP, PASS_ERROR_TEXT,
  PASS_REG_EXP
} from "../../../shared/common/config/validate";

export const registerUserSchema = Yup.object({
  username: Yup
      .string()
      .required('Username is required field')
      .matches(NAME_REG_EXP, NAME_ERROR_TEXT),
  email: Yup
      .string()
      .required('Email is required field')
      .matches(EMAIL_REG_EXP, EMAIL_ERROR_TEXT),
  password: Yup
      .string()
      .required('Password is required field')
      .min(2, 'Password must be at least 2 characters')
      .matches(PASS_REG_EXP, PASS_ERROR_TEXT),
  confirmPassword: Yup
      .string()
      .required('Confirm password is required field')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
});
