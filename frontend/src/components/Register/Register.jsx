import RegistrationForm from "../RegistrationForm/RegistrationForm";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const patternName = '[a-zA-Zа-яА-ЯЁё \\-]';
const patternEmail = '^[a-z0-9.!#_^\\s@]+@[^\\s@]+\\.[^\\s@]+$';

export default function Register({ onRegister, setIsError, error }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()
  const navigate = useNavigate()
  const [email, setEmail] = useState()

  function onSubmit(event) {
    event.preventDefault()
    onRegister(values.name, values.email, values.password)
    navigate('/movies')
  }


    //const emailHandler = (evt) => {
    // setEmail(evt.target.value)
    //var query = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      // const re =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      // if (!re.test(String(evt.target.value).toLowerCase())) {
      //   setEmailError("Некорректно")
      // } else {
      //   setEmailError("error_email")
      // };

    //};

  // function emailCheck(email)
  // {
  //     var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
  //     return re.test(email);
  // }

  // // function emailCheck() {
  //   let query = /[^|\w](\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*)/g;

  //   let inp = document.querySelector("#email");

  //   document.querySelector('.login__button').onCllick= function (e) {
  //     e.preventDefault();
  //     if (!query.test(inp.value)) {
  //       console.log("NO");

  //     } else {
  //       onSubmit()
  //     };
  //   }
  //   };

  return (
    <RegistrationForm class="js-form" name='signup' onSubmit={onSubmit} isValid={isValid} setIsError={setIsError}>
      <p className="form__name">Имя</p>
      <Input
      class="input js-input"
      id = "inputFeature"
        name='name'
        type='text'
        title='Имя'
        placeholder={'Имя'}
        value={values.name}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        isInputValid={isInputValid.name}
        error={errors.name}
        minLength = '2'
        maxLength = '20'
        autocomplete="name"
        pattern={ patternName}
      />
      <p className="form__name">Email</p>
      <Input
      class="input js-input js-input-email"
        id="email"
        name='email'
        type="email"
        placeholder={'Email'}
        value={values.email}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        isInputValid={isInputValid.email}
        error={errors.email}
        autocomplete="email"
        pattern = {patternEmail}/>
      <span id="error_email" className="error_email error_email_invisible">"Формат example@example.ru</span>
      <p className="form__name">Пароль</p>
      <Input
        name='password'
        type='password'
        placeholder={'Пароль'}
        minLength={3}
        value={values.password}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        isInputValid={isInputValid.password}
        error={errors.password}
        autocomplete="current-password"
      />
      <p className="popup__error">{error}</p>
    </RegistrationForm>
  )
}
