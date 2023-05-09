import * as Yup from "yup";
import {
  NAME_ERROR_TEXT,
  NAME_REG_EXP, PASS_ERROR_TEXT, PASS_REG_EXP,
} from "../../../shared/common/config/validate";

export const editUserSchema = Yup.object({
  username: Yup
      .string()
      .required('Username is required field')
      .matches(NAME_REG_EXP, NAME_ERROR_TEXT),
  password: Yup
      .string()
      .matches(PASS_REG_EXP, PASS_ERROR_TEXT),
  confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
});
