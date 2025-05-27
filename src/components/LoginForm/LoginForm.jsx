import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom'; // Додаємо useNavigate для перенаправлення

const LoginForm = ({ onClose }) => {
  const navigate = useNavigate(); // Ініціалізуємо useNavigate

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Стан для повідомлень про помилки

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(''); // Очищаємо попередні помилки

    // 1. Отримуємо всіх зареєстрованих користувачів з localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 2. Шукаємо користувача за логіном
    const foundUser = users.find(user => user.login === login);

    // 3. Перевіряємо, чи знайдено користувача та чи співпадає пароль
    if (foundUser && foundUser.password === password) {
      // Успішний вхід!

      // 4. Зберігаємо інформацію про поточного авторизованого користувача в localStorage
      // Це важливо, щоб інші частини вашого додатку могли знати, хто увійшов
      localStorage.setItem('loggedInUser', JSON.stringify({
        id: foundUser.id,
        login: foundUser.login,
        email: foundUser.email,
        profileImage: foundUser.profileImage
        // НЕ зберігайте пароль у loggedInUser для безпеки
      }));

      console.log('Вхід успішний для користувача:', login);
      onClose(); // Закриваємо модальну форму входу
      navigate('/personal-area'); // Перенаправляємо на сторінку особистого кабінету
    } else {
      // Помилка входу
      setErrorMessage('Неправильний логін або пароль.');
      console.log('Помилка входу: Неправильний логін або пароль.');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles.formTitle}>Вхід</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="login" className={styles.label}>
              Логін:
            </label>
            <input
              type="text"
              id="login"
              className={styles.input}
              value={login}
              onChange={handleLoginChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Пароль:
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>} {/* Відображення помилки */}
          <Button variant="blue" type="submit"> {/* type="submit" для того, щоб onSubmit спрацьовував при Enter */}
            Вхід
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;