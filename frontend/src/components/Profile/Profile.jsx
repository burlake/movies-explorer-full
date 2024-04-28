import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ErrorContext from "../../contexts/ErrorContext";
import SendContext from "../../contexts/SendContext";
import useFormValidation from "../../utils/useFormValidation";
import Form from "../Form/Form";
import { EmailInput, UsernameInput } from "../Register/Input";
import "./profile.css";

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
    fetchBusinesses();
    // eslint-disable-next-line
  }, [currentUser]);

  function onSubmit(evt) {
    evt.preventDefault();
    editUserData(values.name, values.email);
  }

  const didUserInfoChange =
    values.name !== currentUser.name || values.email !== currentUser.email;
  const canEdit = didUserInfoChange && isValid && !isError;
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
          <UsernameInput
            id="profile__input"
            value={values.name ?? ""}
            onChange={handleChange}
            isInputValid={isInputValid.name}
            error={errors.name}
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
          <EmailInput
            id="profile__input" //
            className="profile__area profile__area_type_email profile__input"
            value={values.email ?? ""}
            isInputValid={isInputValid.email}
            error={errors.email}
            onChange={handleChange}
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
          className={`profile__button ${
            !canEdit ? "profile__button_disabled" : ""
          }`}
          disabled={!canEdit}
          onClick={onSubmit}
        >
          Редактировать
        </button>
      </Form>
      <Link to="/" onClick={logOut} className="profile__link">
        Выйти из аккаунта
      </Link>
    </section>
  );
}
