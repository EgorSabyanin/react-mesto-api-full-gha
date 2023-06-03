import { useContext, useState, useEffect } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(event) {
    event.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
      avatar: currentUser.avatar,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup-form__input popup-form__input_el_name"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        id="name"
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup-form__input-error name-input-error"></span>
      <input
        className="popup-form__input popup-form__input_el_description"
        type="text"
        name="description"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        id="description"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <span className="popup-form__input-error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
