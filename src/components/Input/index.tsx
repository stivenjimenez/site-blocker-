import { InputHTMLAttributes } from "react";
import "./input.css";

export const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return <input type="text" {...props} className="input" />;
};
