import "./login.css";

import Input from "../Input/Input";
import { EmailInput, UsernameInput } from "../Register/Input";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import useFormValidation from "../../utils/useFormValidation";


export default function Login({ name, onLogin, setIsError }) {
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
        {/* <Input
          title="E-mail"
          name="email"
          type="email"
          placeholder={"Email"}
          value={values.email}
          onChange={handleChange}
          isInputValid={isInputValid.email}
          error={errors.email}
          autoComplete="email"
        /> */}
        <EmailInput
            className="profile__area profile__area_type_email profile__input"
            value={values.email ?? ""}
            isInputValid={isInputValid.email}
            error={errors.email}
            onChange={handleChange}
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
          value={values.password  ?? ""}
          onChange={handleChange}
          isInputValid={isInputValid.password}
          error={errors.password}
          autoComplete="current-password"
        />
      </div>
    </RegistrationForm>
  );
}
