import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { ImagePopup } from './ImagePopup';
import { PopupWithForm } from './PopupWithForm';
import { Footer } from './Footer';
import { api } from '../utils/Api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { EditProfilePopup } from './EditProfilePopup';
import { AddPlacePopup } from './AddPlacePopup';
import { EditAvatarPopup } from './EditAvatarPopup';

import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Register } from './Register';
import * as auth from "../utils/auth"
import { Login } from './Login';
import { InfoTooltip } from './InfoTooltip';

import '../index.css';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoggedIn = () => {
    setIsLoggedIn(true);
  }

  const handleInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleDeleteButtonClick = (card) => {
    setSelectedCardDelete(card);
    setIsDeletePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  };

  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardDelete, setSelectedCardDelete] = useState(null);

  const handleCardClick = (card) => {
    setSelectedCard(card)
  };

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getCards(),
    ])
      .then(([userData, cards]) => {
        setIsLoggedIn(true);
        history.push('/');
        setCurrentUser(userData.data);
        setCards(cards.data);
      })
      .catch((err) => {
        console.log('Произошла ошибка при загрузке карточек или данных пользователя' + err);
      })
  }, [isLoggedIn])

  const handleCardLike = (card) => {
    const isLiked = (card.likes.some(item => item === currentUser._id));
    if (!isLiked) {
      api.putLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
        })
        .catch((err) => {
          console.log('Произошла ошибка при постановке лайка' + err);
        })
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard.data : c)));
        })
        .catch((err) => {
          console.log('Произошла ошибка при постановке лайка' + err);
        })
      }
  }

  const handleCardDelete = (e) => {
    e.preventDefault();
    api.deleteCard(selectedCardDelete._id)
      .then((res) => {
        setCards((res) => res.filter((c) => c._id !== selectedCardDelete._id));
        setIsDeletePopupOpen(false);
      })
      .catch((err) => {
        console.log('Произошла ошибка при удалении карточки' + err);
      })
  }

  const handleUpdateUser = (data) => {
    api.updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log('Произошла ошибка при изменении данных пользователя' + err);
      })
  }

  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar)
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log('Произошла ошибка при изменении аватара' + err);
      })
  }

  const handleAddPlace = (card) => {
    api.addCard(card)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
      })
      .catch((err) => {
        console.log('Произошла ошибка при добавлении новой карточки' + err);
      })
  }

  const [email, setEmail] = useState()

  const handleLogIn = (email, password) => {
    auth.login(email, password)
      .then((res) => {
        if (res) {
          setEmail(email.email)
          handleLoggedIn()
          history.push('/')
        }
      })
      .catch((err) => {
        setToolTipStatus('fail')
        handleInfoTooltipOpen()
        console.log('Произошла ошибка входа' + err);

      })
  }

  const [toolTipStatus, setToolTipStatus] = useState()

  const history = useHistory();

  const handleRegisterUser = (email, password) => {
    auth.register(email, password)
      .then((res) => {
        if (res.email) {
          setToolTipStatus('success')
          handleInfoTooltipOpen()
          history.push('/signin')
        }
      })
      .catch((err) => {
        setToolTipStatus('fail')
        handleInfoTooltipOpen()
        console.log('Произошла ошибка при регистрации' + err);
      })
  }

  const handleLogOut = () => {
    auth.logOut()
      .then((res) => {
        setIsLoggedIn(false);
        history.push('/signin');
      })
      .catch((err) => {
        console.log('Произошла ошибка' + err);
      })
  }

  return (
    <>

      <Header email={email} isLoggedIn={isLoggedIn} onLogOut={handleLogOut} />

      <CurrentUserContext.Provider value={currentUser}>
        <Switch>

          <Route exect path="/signup">
            <Register onRegister={handleRegisterUser} />
          </Route>

          <Route exect path="/signin">
            <Login onLogIn={handleLogIn} />
          </Route>

          <ProtectedRoute exect path="/"
            isLoggedIn={isLoggedIn}
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onDeleteButton={handleDeleteButtonClick}
            onCardDelete={handleCardDelete}
          />

          <Route path="*">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>

        </Switch>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          status={toolTipStatus}
          successText="Вы успешно зарегистирировались!"
          failText="Что-то пошло не так! Попробуйте ещё раз."
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm name='confirm'
          title='Вы уверены?'
          buttonName='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}

        />

        <ImagePopup
          selectedCard={selectedCard}
          onClose={closeAllPopups}
        />

      </CurrentUserContext.Provider>

      <Footer />

    </>

  );
}

export default App;
