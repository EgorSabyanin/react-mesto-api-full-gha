/**
 * * Routing
 */

import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

import { useState, useEffect } from "react";

import ProtectedRoute from "./ProtectedRoute";

/**
 * * Context
 */

import { CurrentUserContext } from "../contexts/CurrentUserContext";

/**
 * * Import components
 */

import Header from "./Header";
import Login from "./Login";
import Register from "./Register";

import Main from "./Main";

import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import InfoTooltip from "./InfoTooltip";

/**
 * * API
 */

import { api } from "../utils/api";
import { auth } from "../utils/authorization";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

/**
 * * Import resources
 */

import "../index.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  const navigate = useNavigate();

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth.getUser(jwt).then((res) => {
        setLoggedIn(true);
        setUserEmail(res.data.email);
        navigate("/", { replace: true });
      });
    }
  }

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getUser()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => console.log(err));

      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });

  const [isInfoTooltipError, setInfoTooltipError] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setInfoTooltipPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function closeInfoTooltip() {
    setInfoTooltipPopupOpen(false);

    if (isInfoTooltipError) {
      navigate("/sign-in", { replace: true });
    } else {
      navigate("/`", { replace: true });
    }
  }

  function handleUpdateUser(data) {
    api
      .editUserProfile(data)
      .then((res) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .createAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSignUp(data) {
    auth
      .signUp(data)
      .then((res) => {
        setInfoTooltipError(false);
        handleInfoTooltipClick();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSignIn(data) {
    auth
      .signIn(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        setInfoTooltipError(true);
        handleInfoTooltipClick();
        console.log(error);
      });
  }

  function signOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page__container">
          <Header userEmail={userEmail} onSignOut={signOut} />
          <Routes>
            <Route
              path="*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="sign-in" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onClickImage={handleCardClick}
                  onHandleCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/sign-up"
              element={<Register onSubmitForm={handleSignUp} />}
            />
            <Route
              path="/sign-in"
              element={
                <Login
                  onSubmitForm={handleSignIn}
                  setUserEmail={setUserEmail}
                />
              }
            />
          </Routes>
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeInfoTooltip}
          name={"infotooltip"}
          isError={isInfoTooltipError}
        />
        <PopupWithForm name="delete-card" title="Вы уверены?">
          <button
            className="popup-form__submit popup-form__submit_type_small"
            type="submit"
          >
            Да
          </button>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
