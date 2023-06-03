import { useRef } from "react";

function Login({ onSubmitForm, setUserEmail }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setUserEmail(emailRef.current.value);
    onSubmitForm(data);
  }

  return (
    <div className="authorization">
      <h1 className="authorization__title">Вход</h1>
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
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
