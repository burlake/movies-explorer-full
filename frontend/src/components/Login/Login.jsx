import "./login.css";

import Input from "../Input/Input";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import useFormValidation from "../../utils/useFormValidation";

export default function Login({
  name,
  onLogin,
  setIsError,
}) {
  const { values, errors, isValid, isInputValid, handleChange } =
    useFormValidation();

  function onSubmit(evt) {
    evt.preventDefault();
    onLogin(values.email, values.password);
  }

  return (
    <RegistrationForm
      name={name}
      onSubmit={onSubmit}
      isValid={isValid}
      setIsError={setIsError}
    >
      <div className="login_container">
        <p className="form__name">E-mail</p>
        <Input
          title="E-mail"
          name="email"
          type="email"
          placeholder={"Email"}
          value={values.email}
          onChange={handleChange}
          isInputValid={isInputValid.email}
          error={errors.email}
          autocomplete="email"
        />
      </div>
      <div className="login_container">
        <p className="form__name">Пароль</p>
        <Input
          title="Пароль"
          name="password"
          type="password"
          placeholder={"Пароль"}
          minLength={3}
          value={values.password}
          onChange={handleChange}
          isInputValid={isInputValid.password}
          error={errors.password}
          autocomplete="current-password"
        />
      </div>
    </RegistrationForm>
  );
}
