'use client';

import type { ReactElement } from 'react';

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  type = 'button',
  ...props
}: PropsWithChildren<ButtonProps>): ReactElement => {
  const variantClass = `${variant}-button`;
  const composedClassName = className ? `${variantClass} ${className}` : variantClass;

  return (
    <button className={composedClassName} type={type} {...props}>
      {children}
    </button>
  );
};
