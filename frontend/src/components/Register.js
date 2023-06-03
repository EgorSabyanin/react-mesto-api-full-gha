import { Link } from "react-router-dom";
import { useRef } from "react";

function Register({ onSubmitForm }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    onSubmitForm(data);
  }
  return (
    <div className="authorization">
      <h1 className="authorization__title">Регистрация</h1>
      <form className="authorization__form" onSubmit={handleSubmit}>
        <fieldset className="authorization__fieldset">
          <input
            className="authorization__input"
            placeholder="Email"
            type="email"
            ref={emailRef}
          />
          <input
            className="authorization__input"
            placeholder="Пароль"
            type="password"
            ref={passwordRef}
          />
          <button className="authorization__submit" type="submit">
            Зарегистрироваться
          </button>
          <p className="authorization__link">
            Уже зарегистрированы?{" "}
            <Link className="authorization__link" to="/sign-in">
              Войти
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
}

export default Register;
