import React, {FC, InputHTMLAttributes} from "react";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  required?: boolean;
  value?: string;
  register?: any;
  errors?: any;
}

export const TextAreaField: FC<IInputProps> = (props) => {
  return (
    <>
      <textarea
        {...props}
        {...props.register}
      />
    </>
  );
};