import type { ButtonHTMLAttributes, FC, ReactNode } from "react";

import "./button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger";
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <button className={`button button--${variant}`} {...props}>
      {children}
    </button>
  );
};
