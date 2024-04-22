import { useContext} from "react";
import { useLocation } from "react-router-dom";

import "./form.css";

import SendContext from "../../contexts/SendContext";

function Form({ name, titleButton, children, isValid, onSubmit }) {
  const isSend = useContext(SendContext);
  const { pathname } = useLocation();

  return (
    <form noValidate name={name} onSubmit={onSubmit}>
      {children}
      {pathname === "/signup" && (
          <button

                type="submit"
                className={`${
                  name === "signin" || name === "signup"
                    ? "login__button"
                    : "profile__submit"
                }
                  ${
                    isSend
                      ? name === "signin" || name === "signup"
                        ? "login__button_loading"
                        : "profile__submit_loading"
                      : ""
                  }
                  ${
                    isValid
                      ? ""
                      : name === "signin" || name === "signup"
                      ? "login__button_disable"
                      : "profile__submit_disable"
                  }`}
                disabled={isSend}
              >
                {isSend ? "" : titleButton || "Сохранить"}
              </button>)}

              {pathname === "/signin" && (
          <button

                type="submit"
                className={`${
                  name === "signin" || name === "signup"
                    ? "login__button"
                    : "profile__submit"
                }
                  ${
                    isSend
                      ? name === "signin" || name === "signup"
                        ? "login__button_loading"
                        : "profile__submit_loading"
                      : ""
                  }
                  ${
                    isValid
                      ? ""
                      : name === "signin" || name === "signup"
                      ? "login__button_disable"
                      : "profile__submit_disable"
                  }`}
                disabled={isSend}
              >
                {isSend ? "" : titleButton || "Сохранить"}
              </button>)}

    </form>
  );
}
export default Form;
