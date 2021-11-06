
import { Link } from "react-router-dom";
import { useState } from 'react';

export function Register( { onRegister } ) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(
      { email,
      password, }
    );
  }

  return (

    <main className="page__container">

      <section className="form">

        <h2 className="form__title">Регистрация</h2>
        <form name="sign-up" className="form__container" onSubmit={(e) => handleSubmit(e)} >

          <input type="email" name="email" className="form__input" id="email"
            placeholder="email" minLength="2" maxLength="30" required value={email} onChange={(e) => handleChangeEmail(e)} />
          <input type="password" name="password" className="form__input" id="password"
            placeholder="Пароль" required value={password} onChange={(e) => handleChangePassword(e)} />

          <button className="form__button-submit form__button-submit_type_sign-up" type="submit">Зарегистрироваться</button>

          <Link className="form__link element-hover" to="/login">Уже зарегистрировались? Войти</Link>

        </form>

      </section>

    </main>

  )
}