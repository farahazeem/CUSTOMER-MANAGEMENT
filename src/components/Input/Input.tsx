import React from "react";
import classes from "./input.module.css";
import InputContainer from "../InputContainer/InputContainer";

interface InputProps {
  label: string;
  type: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name: string;
  error: any;
  placeholder?: string;
}

function Input(
  {
    label,
    type,
    defaultValue,
    onChange,
    onBlur,
    name,
    error,
    placeholder,
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;

    switch (error.type) {
      case "required":
        return "This field is required";
      case "minLength":
        return "Field is too short";
      default:
        return "*";
    }
  };
  const id = `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <InputContainer label={label} id={id} bgColor={undefined}>
      <input
        id={id}
        defaultValue={defaultValue}
        className={classes.input}
        type={type}
        placeholder={placeholder ? placeholder : label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete="off"
      />
      {error && <div className={classes.error}>{getErrorMessage()}</div>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
