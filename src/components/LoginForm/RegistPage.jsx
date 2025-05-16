// components/LoginForm/RegistPage.js
import React from 'react';
import styles from './RegistPage.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const RegistPage = () => {
  const navigate = useNavigate(); // Отримуємо функцію navigate

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Дані форми відправлено!');
    // Тут має бути логіка відправки даних реєстрації на сервер

    // Після успішної реєстрації перенаправляємо користувача
    navigate('/personal-area');
  };

  return (
    <div className={styles.loginFormContainer}>
      <h1>Реєстрація</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="login">Логін:</label>
          <input type="text" id="login" name="login" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Ел. адреса:</label>
          <input type="email" id="email" name="email" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль:</label>
          <input type="password" id="password" name="password" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Фото профіля:</label> {/* Змінено текст label */}
          <input type="file" id="image" name="image" className={styles.input} accept="image/*" />
        </div>
        <Button type="submit" variant="blue" >
          Зареєструватися
        </Button>
      </form>
    </div>
  );
};

export default RegistPage;