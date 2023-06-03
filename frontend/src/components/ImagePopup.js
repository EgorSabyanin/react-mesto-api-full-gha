function ImagePopup({ card, onClose }) {
  return (
    <div
      id="showCardPopup"
      className={`popup popup_showcase ${card.link ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_showcase">
        <img
          className="popup__image"
          loading="lazy"
          src={card.link}
          alt={card.name}
        />
        <p className="popup__title">{card.name}</p>
        <button
          id="closeShowCard"
          className="popup__close"
          type="button"
          aria-label="Закрыть просмотр изображения"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
