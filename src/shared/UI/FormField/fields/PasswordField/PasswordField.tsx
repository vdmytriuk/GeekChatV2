import {FC, InputHTMLAttributes, useState} from "react";

import Eye from "../../../../assets/svg/eye.svg";
import EyeSlash from "../../../../assets/svg/eye-slash.svg";

import './PasswordField.scss';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  required?: boolean;
  value?: string;
  setValue?: any;
  register?: any;
}

export const PasswordField: FC<IInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="password-wrap">
      <input
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="field__input"
        {...props.register}
      />

      <button
        type='button'
        className='password-wrap__eye'
        onClick={() => setShowPassword(!showPassword)}
        aria-label='Toggle show password'
        aria-hidden="true"
      >
          {showPassword ?
              <Eye/>
              :
              <EyeSlash/>
          }
      </button>
    </div>
  )
}