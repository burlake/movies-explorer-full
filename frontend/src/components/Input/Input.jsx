import { useContext } from "react";
import "./Input.css";
import SendContext from "../../contexts/SendContext.js";

export default function Input({
  name,
  type,
  title,
  placeholder,
  minLength,
  maxLength,
  isInputValid,
  value,
  onChange,
  error,
}) {
  const isSend = useContext(SendContext);

  return (
    <>
      <input
        name={name}
        type={type}
        title={title}
        placeholder={placeholder}
        minLength={minLength ? minLength : ""}
        maxLength={maxLength ? maxLength : ""}
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
        value={value ? value : ""}
        onChange={onChange}
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
