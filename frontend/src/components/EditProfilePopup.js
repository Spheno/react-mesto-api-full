import { useState, useEffect, useContext } from 'react';
import { PopupWithForm } from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name='profile'
      title='Редактировать профиль'
      buttonName='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
    >
      <label className="popup__form-field">
        <input type="text" className="popup__input popup__input_info_name" name="name" id="firstname" placeholder="Имя"
          minLength="2" maxLength="40" required value={name || ''} onChange={(e) => handleChangeName(e)} />
        <span className="popup__input-error" id="firstname-error"></span>
      </label>
      <label className="popup__form-field">
        <input type="text" className="popup__input popup__input_info_about" name="about" id="about" placeholder="О себе"
          minLength="2" maxLength="200" required value={description || ''} onChange={(e) => handleChangeDescription(e)} />
        <span className="popup__input-error" id="about-error"></span>
      </label>

    </PopupWithForm>
  )
}