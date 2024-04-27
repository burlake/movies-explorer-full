import { useNavigate } from "react-router-dom";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import { EmailInput, UsernameInput } from "./Input";

export default function Register({ onRegister, setIsError, error }) {
  const { values, errors, isValid, isInputValid, handleChange } =
    useFormValidation();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    onRegister(values.name, values.email, values.password);
    navigate("/movies");
  }

  return (
    <RegistrationForm
      className="js-form"
      name="signup"
      onSubmit={onSubmit}
      isValid={isValid}
      setIsError={setIsError}
    >
      <p className="form__name">Имя</p>
      <UsernameInput
        id="inputFeature"
        className="input js-input"
        value={values.name ?? ""}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }}
        isInputValid={isInputValid.name}
        error={errors.name}
      />
      <p className="form__name">Email</p>
      <EmailInput
        className="input js-input js-input-email"
        value={values.email ?? ""}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }}
        isInputValid={isInputValid.email}
        error={errors.email}
      />
      <span id="error_email" className="error_email error_email_invisible">
        "Формат example@example.ru
      </span>
      <p className="form__name">Пароль</p>
      <Input
        name="password"
        type="password"
        placeholder={"Пароль"}
        minLength={3}
        value={values.password}
        onChange={(evt) => {
          handleChange(evt);
          setIsError(false);
        }}
        isInputValid={isInputValid.password}
        error={errors.password}
        autoComplete="current-password"
      />
      <p className="popup__error">{error}</p>
    </RegistrationForm>
  );
}
