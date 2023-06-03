import React from "react";

import Footer from "./Footer";

import defaultAvatar from "../../src/images/users/jack-kusto.jpg";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";

function Main(props) {
  const currentUserContext = React.useContext(CurrentUserContext);

  const cardElements = props.cards.map((card) => {
    return (
      <Card
        card={card}
        key={card._id}
        _id={card._id}
        likes={card.likes}
        name={card.name}
        link={card.link}
        numberOfLikes={card.likes.length}
        onCardClick={props.onClickImage}
        onCardLike={props.onHandleCardLike}
        onCardDelete={props.onCardDelete}
      />
    );
  });

  return (
    <>
      <main>
        <section className="profile">
          <div className="profile__info">
            <div className="profile__avatar-container">
              <img
                className="profile__image"
                src={currentUserContext.avatar || defaultAvatar}
                alt={currentUserContext.name || "Egor Sabyanin"}
                loading="lazy"
              />
              <button
                className="profile__avatar-button"
                onClick={props.onEditAvatar}
              ></button>
            </div>
            <div className="profile__content">
              <div className="profile__edit">
                <h1 className="profile__name">
                  {currentUserContext.name || "Egor Saabyanin"}
                </h1>
                <button
                  className="profile__edit-button"
                  type="button"
                  aria-label="Редактировать профиль"
                  onClick={props.onEditProfile}
                ></button>
              </div>
              <p className="profile__description">
                {currentUserContext.about || "Web developer"}
              </p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="Создать карточку"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="elements">{cardElements}</section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
