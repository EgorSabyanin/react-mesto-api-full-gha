import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const linkRef = useRef();
  const nameRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      name: nameRef.current.value,
      link: linkRef.current.value,
    };

    onAddPlace(data);
  }

  return (
    <PopupWithForm
      name="create-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitText="Создать"
    >
      <input
        className="popup-form__input popup-form__input_el_name-of-image"
        type="text"
        name="nameOfImage"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="nameOfImage"
        ref={nameRef}
      />
      <span className="popup-form__input-error nameOfImage-input-error"></span>
      <input
        className="popup-form__input popup-form__input_el_link-of-image"
        type="url"
        name="linkOfImage"
        placeholder="Ссылка на картинку"
        required
        id="linkOfImage"
        ref={linkRef}
      />
      <span className="popup-form__input-error linkOfImage-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
