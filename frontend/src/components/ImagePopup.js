import { Popup } from './Popup'

export function ImagePopup({ onClose, selectedCard }) {

  return (
    <Popup onClose={onClose} isOpen={selectedCard} name={'image'} >
      <div className="popup__image-container">
        <figure>
          <img className="popup__image" alt={selectedCard ? `${selectedCard.title}` : ''} src={selectedCard ? `${selectedCard.link}` : ''} />
          <figcaption className="popup__caption">{selectedCard ? selectedCard.title : ''}</figcaption>
        </figure>
        <button className="popup__button-close popup__button-close_type_image element-hover" type="button"
          aria-label="Закрыть" onClick={onClose}></button>
      </div>
    </Popup>

  )
}