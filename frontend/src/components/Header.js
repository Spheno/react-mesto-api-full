import vector from '../images/Vector.svg';
import { Route, Link, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Header({ email, onSignOut, isLoggedIn, onLogOut }) {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    setIsMenuOpen(true)
    setIsClicked(true)
  }

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  const [isClicked, setIsClicked] = useState(false);

  const handleMenuClose = () => {
    setIsClicked(false)
    setIsMenuOpen(false)
  }

  return (
    <header className="header page__container">
      <img className="header__logo" alt="логотип Место" src={vector} />
      <div className={`header__lk ${windowSize < 602 && !isMenuOpen ? `header__lk element_hidden` : ''}`}>

        <Switch>
          <Route exact path='/'>

            {windowSize > 602 || isMenuOpen ? <p className="header__user-name">{email}</p> : ''}
            {windowSize > 602 || isMenuOpen ? <button className='header__button element-hover' type="button"
              aria-label="Выйти" onClick={onLogOut}>Выйти</button> : ''}

          </Route>
          <Route path='/signup'>
            <Link className="header__link element-hover" to='/login'>Войти</Link>
          </Route>
          <Route path='/signin'>
            <Link className="header__link element-hover" to='/signup'>Регистрация</Link>
          </Route>
        </Switch>
      </div>
      {isLoggedIn && !isClicked ? <button className="header__button header__button-menu header__button-menu_type_open element-hover" type="button"
        aria-label="Выйти" onClick={() => handleMenuOpen()} ></button> : ''}
      {isLoggedIn && isClicked ? <button className="header__button header__button-menu header__button-menu_type_close element-hover" type="button"
        aria-label="Выйти" onClick={() => handleMenuClose()} ></button> : ''}
    </header>
  )
}