import { Popup } from './Popup'

export function InfoTooltip({ isOpen, onClose, status, successText, failText }) {

  return (
    <Popup isOpen={isOpen} onClose={onClose} name='info-tooltip' >
      <div className="popup__container popup__container_type_info-tooltip">
        {status === 'success' ? <div className="popup__info-tooltip-image popup__info-tooltip-image_type_success"></div> : <div className="popup__info-tooltip-image popup__info-tooltip-image_type_fail"></div>}
        <h2 className="popup__title popup__title_type_info-tooltip">{status === 'success' ? `${successText}` : `${failText}`}</h2>
        <button className={`popup__button-close popup__button-close_type_info-tooltip element-hover`} type="button"
          aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </Popup>
  )
}