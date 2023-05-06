import {ButtonHTMLAttributes} from "react";

import './Button.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  isCompleted?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({type, onClick, disabled, children}: IButtonProps) => {
  const btnEnableDisable = !disabled ? "btn_enable" : "btn_disabled";

  return (
    <button
      className={`btn ${btnEnableDisable}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button;