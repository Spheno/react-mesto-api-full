import { PopupWithForm } from './PopupWithForm';
import { useState } from 'react';

export function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  function handleChangeTitle(e) {
    e.preventDefault();
    setTitle(e.target.value);
  }

  function handleChangeLink(e) {
    e.preventDefault();
    setLink(e.target.value);
  }

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: title,
      link,
    });
  }

  return (
    <PopupWithForm name='new-item'
      title='Новое место'
      buttonName='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleAddPlaceSubmit(e)}
    >
      <label className="popup__form-field">
        <input type="text" name="name" className="popup__input popup__input_img_title" id="img-title"
          placeholder="Название" minLength="2" maxLength="30" required value={title} onChange={(e) => handleChangeTitle(e)} />
        <span className="popup__input-error" id="img-title-error"></span>
      </label>
      <label className="popup__form-field">
        <input type="url" name="link" className="popup__input popup__input_img_url" id="img-url"
          placeholder="Ссылка на картинку" required value={link} onChange={(e) => handleChangeLink(e)} />
        <span className="popup__input-error" id="img-url-error"></span>
      </label>
    </PopupWithForm>
  )
}