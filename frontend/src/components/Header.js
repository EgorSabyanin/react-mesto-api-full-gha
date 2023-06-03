import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ userEmail, onSignOut }) {
  return (
    <header className="header">
      <a className="header__icon" href="./">
        <img className="header__logo" src={logo} alt="Логотип" />
      </a>
      <div className="header__panel">
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__log header__log_active">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__log header__log_active">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__user-email">{userEmail}</p>
                <Link className="header__log" onClick={onSignOut}>
                  Выйти
                </Link>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
