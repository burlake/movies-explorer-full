import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import useFormValidation from "../../utils/useFormValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ErrorContext from "../../contexts/ErrorContext";
import SendContext from "../../contexts/SendContext";
import Input from "../Input/Input";
import Form from "../Form/Form";

export default function Profile({
  name,
  logOut,
  editUserData,
  setIsError,
  isSuccess,
  setSuccess,
  setIsEdit,
  isEdit,
  error,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isInputValid, isValid, handleChange, reset } =
    useFormValidation();
  const isError = useContext(ErrorContext);
  const isSend = useContext(SendContext);

  useEffect(() => {
    setIsError(false);
  }, [setIsError, values]);

  useEffect(() => {
    setSuccess(false);
    setIsEdit(false);
  }, [setSuccess, setIsEdit]);

  useEffect(() => {
    function fetchBusinesses() {
        reset({ name: currentUser.name, email: currentUser.email });
    }
    fetchBusinesses()
    // eslint-disable-next-line
  }, [currentUser])

  function onSubmit(evt) {
    evt.preventDefault();
    editUserData(values.name, values.email);
  }

  return (
    <section className="profile">
      <h2 className="profile__greeting">{`Привет, ${currentUser.name}!`}</h2>
      <Form
        className="profile__form"
        isValid={isValid}
        onSubmit={onSubmit}
        setIsError={setIsError}
        values={values}
        isSuccess={isSuccess}
        setSuccess={setSuccess}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
      >
        <p className="profile__text">
          Имя
          <Input
            className="'popup__input"
            selectname={name}
            name="name"
            type="text"
            title="Имя"
            minLength="3"
            value={values.name}
            isInputValid={isInputValid.name}
            error={errors.name}
            onChange={handleChange}
            isEdit={isEdit}
          />
        </p>
        <span
          className={`${
            name === "password" || name === "email"
              ? "login__error"
              : "popup__error"
          }`}
        >
          {error}
        </span>

        <p className="profile__text">
          E-mail
          <Input
            className="profile__area profile__area_type_email"
            selectname={name}
            name="email"
            type="email"
            title="E-mail"
            value={values.email}
            isInputValid={isInputValid.email}
            error={errors.email}
            onChange={handleChange}
            pattern={"^\\S+@\\S+\\.\\S+$"}
            isEdit={isEdit}
          />
        </p>
        <span
          className={`profile__error-request ${
            isError
              ? "profile__error-request_type_error"
              : isSuccess && "profile__error-request_type_success"
          }`}
        >
          {isError ? "При обновлении профиля произошла ошибка." : "Успешно"}
        </span>
        <button
            className={`profile__submit ${(values.name === currentUser.name && values.email === currentUser.email) || !isValid || isError ? 'profile__submit_disabled' : ''}`}
            disabled={!isValid || isSend || isError}
            >Сохранить изменения</button>
      </Form>
      <Link
        to="/profile"
        type="button"
        onClick={ onSubmit }
        className="profile__button"
        disabled={!isValid }

      >
        Редактировать
      </Link>
      <Link to="/" onClick={logOut} className="profile__link">
        Выйти из аккаунта
      </Link>
    </section>
  );
}
