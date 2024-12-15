import React from "react";
import classes from "./button.module.css";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  text?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
  width?: string;
  height?: string;
}

export default function Button({
  type = "button",
  text = "Submit",
  onClick,
  color = "white",
  backgroundColor = "#e72929",
  fontSize = "1.3rem",
  width = "12rem",
  height = "3.5rem",
}: ButtonProps)  {
  return (
    <div className={classes.container}>
      <button
        style={{
          color,
          backgroundColor,
          width,
          height,
          fontSize,
        }}
        type={type}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
}
