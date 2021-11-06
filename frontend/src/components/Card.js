import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';


export function Card({ card, onCardClick, onCardLike, onDeleteClick }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__button-del' : 'element_hidden'}`
  );

  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = (
    `element__button-like ${isLiked ? 'element__button-like_active' : ''}`
  );

  return (
    <li className="element">
      <button className="element__button-image" type="button" aria-label="Показать изображение полностью">
        <div className="element__image" style={{ backgroundImage: `url(${card.link})` }} onClick={() => onCardClick(card)} />
      </button>
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={() => onCardLike(card)}></button>
          <h3 className="element__counter-like">{card.likes.length}</h3>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={() => onDeleteClick(true)}></button>
    </li>
  )
}