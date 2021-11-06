import { PopupWithForm } from './PopupWithForm';
import { useRef } from 'react';

export function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {

  const urlInput = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const currentAvatar = urlInput.current;
    onUpdateAvatar(
      currentAvatar.value
    );
    currentAvatar.value = '';
  }

  return (
    <PopupWithForm name='avatar-change'
      title='Обновить аватар'
      buttonName='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(e) => handleSubmit(e)}
    >

      <label className="popup__form-field">
        <input type="url" name="link" className="popup__input popup__input_avatar_url" id="avatar-url"
          placeholder="Ссылка на аватар" ref={urlInput} />
        <span className="popup__input-error" id="avatar-url-error"></span>
      </label>

    </PopupWithForm>
  )
}