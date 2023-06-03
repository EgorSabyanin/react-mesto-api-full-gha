import { useRef } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({ avatar: avatarRef.current.value });
  }

  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      submitText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup-form__input popup-form__input_el_link-of-image"
        type="url"
        name="linkOfAvatar"
        placeholder="Ссылка на аватар"
        required
        id="linkOfAvatar"
        ref={avatarRef}
      />
      <span className="popup-form__input-error linkOfAvatar-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
