import { Popup } from './Popup'

export function PopupWithForm({ isOpen, onClose, name, title, buttonName, children, onSubmit }) {

  return (
    <Popup isOpen={isOpen} onClose={onClose} name={name} >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={`${name}`} className={`popup__form popup__form_type_${name}`} onSubmit={onSubmit} >
          {children}
          <button className={`popup__button-submit popup__button-submit_type_${name}`} type="submit"
            value={`${buttonName}`} onClick={onClose}>{buttonName}</button>
          <button className={`popup__button-close popup__button-close_type_${name} element-hover`} type="button"
            aria-label="Закрыть" onClick={onClose}></button>
        </form>
      </div>
    </Popup>
  )
}