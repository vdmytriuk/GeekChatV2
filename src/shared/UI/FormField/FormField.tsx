import React, {FC, InputHTMLAttributes, useState} from "react";

import useFormField from "./common/useFormField";

import Alert from '../../assets/svg/alert.svg';
import Verify from '../../assets/svg/verify.svg';

import './FormField.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  label?: string;
  value?: string;
  setValue?: any;
  required?: boolean;
  pattern?: any;
  errorPrompt?: string;
  register?: any;
  success?: any;
  errorMessage?: any;
}

const FormField: FC<IInputProps> = (
  {
    type,
    name,
    register,
    errorMessage,
    success,
    ...rest
  }) => {
  const Component = useFormField(type);

  return (
    <div className="field">
      {type !== 'checkbox' &&
        <label
          htmlFor={name}
          className="field__label"
        >
          {rest.label}
        </label>
      }

      <Component
        {...rest}
        id={name}
        type={type}
        name={name}
        register={register}
        className={type === 'checkbox' ? 'field__checkbox' : 'field__input'}
      />

      {errorMessage ?
        <span className={`field__prompt ${errorMessage ? "field__prompt_active" : ""} medium-text gray600-text`}>
            <Alert/>{errorMessage}
         </span>
        :
        null
      }

      {success ?
        <span className={`success ${success ? "success_active" : ""}`}>
            <Verify/>
          </span>
        :
        null
      }
    </div>
  );
};

export default FormField;