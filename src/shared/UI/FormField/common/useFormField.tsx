import {DefaultField} from "../fields/DefaultField/DefaultField";
import {PasswordField} from "../fields/PasswordField/PasswordField";
import {TextAreaField} from "../fields/DefaultField/TextAreaField";

const useFormField = (type: string) => {
  switch (type) {
    case 'password':
      return PasswordField;

    case 'textarea':
      return TextAreaField;

    default:
      return DefaultField;
  }
};

export default useFormField;