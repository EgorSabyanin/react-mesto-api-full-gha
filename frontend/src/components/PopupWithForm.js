function PopupWithForm(props) {
  return (
    <div
      className={`${
        props.isOpen
          ? `popup popup_opened popup_type_${props.name}`
          : `popup popup_type_${props.name}`
      } `}
    >
      <div className="popup__container">
        <form
          className="popup-form"
          action="./"
          method="POST"
          name={props.name + "Form"}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup-form__title">{props.title}</h2>
          <fieldset className="popup-form__fieldset">
            {props.children}
            <button className="popup-form__submit" type="submit">
              {props.submitText}
            </button>
          </fieldset>
        </form>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть форму создания карточки"
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
