import React, {ChangeEvent, FC, TextareaHTMLAttributes} from "react";

import './Textarea.scss';

interface ITextAreaProps extends React.DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  name: string;
  label: string;
  value?: string;
  setText?: any;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: FC<ITextAreaProps> = ({value, setText, name, label, ...rest}) => {
  const handleChangeEvent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  }

  return (
    <div className="field">
      {label &&
        <label
          htmlFor={name}
          className="field__label"
        >
          {label}
        </label>
      }

      <textarea
        {...rest}
        className="field__textarea"
        name={name}
        value={value}
        onChange={handleChangeEvent}
      />
    </div>
  )
}