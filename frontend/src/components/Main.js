import { useContext } from 'react'
import { Card } from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, onDeleteButton }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile page__container">
        <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} />
        <button className="profile__button-avatar-change" type="button" aria-label="Изменить аватар" onClick={() => onEditAvatar(true)}></button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__button-edit element-hover" type="button" aria-label="Редактировать профиль" onClick={() => onEditProfile(true)}></button>
          <p className="profile__about">{currentUser.about}</p>
        </div>
        <button className="profile__button-add element-hover" type="button" aria-label="Добавить картинку" onClick={() => onAddPlace(true)}></button>
      </section>

      <section>
        <ul className="elements page__container">

          {cards.map(card => {
            return <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={() => onCardLike(card)}
            onCardDelete={() => onCardDelete(card)}
            onDeleteClick={() => onDeleteButton(card)}
            />
          })}

        </ul>
      </section>
    </main>
  )
}