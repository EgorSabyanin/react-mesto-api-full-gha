import logoSuccess from "../images/success.svg";
import logoError from "../images/error.svg";

function InfoTooltip({ isOpen, onClose, name, isError }) {
  return (
    <div
      className={`${
        isOpen
          ? `popup popup_opened popup_type_${name}`
          : `popup popup_type_${name}`
      }`}
    >
      <div className="popup__container">
        <div className="infotooltip">
          <img
            className="infotooltip__icon"
            src={isError ? logoError : logoSuccess}
            alt="Логотип"
          />
          <h2 className="infotooltip__text">
            {isError
              ? `Что-то пошло не так!
Попробуйте ещё раз.`
              : `Вы успешно зарегистрировались!`}
          </h2>
        </div>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть форму создания карточки"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
