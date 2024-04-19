import RegistrationForm from "../RegistrationForm/RegistrationForm";
import useFormValidation from "../../utils/useFormValidation";
import Input from "../Input/Input";
import { useNavigate } from "react-router-dom";


export default function Register({ onRegister, setIsError, error }) {
  const { values, errors, isValid, isInputValid, handleChange } = useFormValidation()
  const navigate = useNavigate()

  // function onLogin (event) {
    // event.preventDefault()
    // console.log("onRegister", username, email, password); //undefined undefined undefined
    // onRegister(values.name, values.email, values.password)
  // }

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
      />
      <p className="form__name">Email</p>
      <Input
        name='email'
        type='email'
        placeholder={'Email'}
        value={values.email}
        onChange={(evt) => {
          handleChange(evt)
          setIsError(false)
        }}
        isInputValid={isInputValid.email}
        error={errors.email}
        autocomplete="email"
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
