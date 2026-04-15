import React, { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  tooltip?: string;
}

export const Button: FC<ButtonProps> = ({ label, tooltip, ...props }) => {
  const className = ['custom-button', props.className].filter(Boolean).join(' ');

  return (
    <div className="button-wrapper">
      <button {...props} className={className}>
        {label}
      </button>
      {tooltip && <span className="tooltip-text">{tooltip}</span>}
    </div>
  );
};
