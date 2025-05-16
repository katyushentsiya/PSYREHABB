import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import Button from '../Button/Button';

const LoginForm = ({ onClose }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Тут буде логіка обробки входу (наприклад, відправка на сервер)
    console.log('Логін:', login);
    console.log('Пароль:', password);
    // Після успішного входу можна закрити форму
    onClose();
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
          <Button variant="blue" onClick={handleSubmit}>
            Вхід
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;