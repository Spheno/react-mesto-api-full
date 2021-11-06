import { useEffect, useRef } from 'react';

export function Popup({ isOpen, onClose, name, children }) {
  const popupLinkRef = useRef();

  useEffect(() => {
    if (!isOpen) return
    document.addEventListener('keyup', (e) => { handlerClosePopupOnEsc(e) });
    return () => {
      document.removeEventListener('keyup', (e) => { handlerClosePopupOnEsc(e) });
    }

  }, [isOpen, onClose])

  function handlerClosePopupOnEsc(e) {
    if (e.key === 'Escape') {
      onClose();
    }
  }

  function handlerClosePopupOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
      onClose();
    }
  }

  return (
    <div>
      <article className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`} ref={popupLinkRef} onClick={(e) => handlerClosePopupOverlayClick(e)} >
        {children}
      </article>
    </div>
  )
}