import RegistrationForm from "../RegistrationForm/RegistrationForm";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register({ onRegister, setIsError, error }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  // const [password, setPassword] = useState()
  // const [emailDirty, setEmailDirty] = useState(false)
  // const [passwordDirty, setPasswordDirty] = useState(false)
  const [emailError, setEmailError] = useState("Адрес почты с ошибкой - формат example@example.ru")
  // const [passwordError, setPasswordError] = useState("Парольне может быть пустым")


  const emailHandler = (evt) => {
    setEmail(evt.target.value)

      const re =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (!re.test(String(evt.target.value).toLowerCase())) {
        setEmailError("Некорректно")
      } else {
        setEmailError("")
      };

    };





  function onSubmit(event) {
    event.preventDefault()
    onRegister(values.name, values.email, values.password)
    navigate('/movies')
  }

  return (
    <RegistrationForm name='signup' onSubmit={onSubmit} isValid={isValid} setIsError={setIsError}>
      <p className="form__name">Имя</p>
      <Input
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
        pattern="/^[А-ЯA-ZёәіңғүұқөһӘІҢҒҮҰҚӨҺ\h-]+$/umi"
      />
      <p className="form__name">Email</p>
      <Input
        id="email"
        name='email'
        type="email"
        placeholder={'Email'}
        value={values.email}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
          emailHandler(evt)
        }}
        isInputValid={isInputValid.email}
        error={errors.email}
        autocomplete="email"
        pattern = {/^[a-zA-Z0-9+\._\-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,4}$/.source}
      />
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
