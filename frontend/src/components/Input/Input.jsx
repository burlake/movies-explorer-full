import { useContext } from "react";
import "./Input.css";
import SendContext from "../../contexts/SendContext.js";

export default function Input({ name, isInputValid, error, ...props }) {
  const isSend = useContext(SendContext);

  return (
    <>
      <input
        {...props}
        name={name}
        required
        className={`${(name =
          "name" || name === "password" || name === "email"
            ? "login__input"
            : "popup__input")}
          ${
            isInputValid === undefined || isInputValid
              ? ""
              : name === "login" || name === "email"
              ? "login__input_invalid"
              : "popup__input_invalid"
          }`}
        disabled={isSend}
        autoComplete="current-password"
      />
      <span
        className={`${
          name === "password" || name === "email"
            ? "login__error"
            : "popup__error"
        }`}
      >
        {error}
      </span>
    </>
  );
}
