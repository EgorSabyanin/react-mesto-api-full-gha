import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  name,
  link,
  numberOfLikes,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <figure className="element">
      {isOwn && (
        <button
          className="element__remove"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="element__image"
        loading="lazy"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <figcaption className="element__caption">
        <p className="element__text">{name}</p>
        <div className="element__like-container">
          <button
            type="button"
            className={`element__like ${isLiked && "element__like_active"}`}
            aria-label="Отметить запись понравившейся"
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counter">{numberOfLikes}</span>
        </div>
      </figcaption>
    </figure>
  );
}

export default Card;
