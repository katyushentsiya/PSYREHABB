import React, { useState } from 'react';
import styles from './RegistPage.module.css';
import Button from '../Button/Button';
import LoginForm from '../LoginForm/LoginForm'; // Імпортуємо форму входу

const RegistPage = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showLogin, setShowLogin] = useState(false); // Додано

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setProfileImage('');
    }
  };

const handleSubmit = (event) => {
  event.preventDefault();
  setErrorMessage('');
  setSuccessMessage('');

  if (!login || !email || !password) {
    setErrorMessage('Будь ласка, заповніть всі обов\'язкові поля (логін, email, пароль).');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  const loginExists = users.some(user => user.login === login);
  const emailExists = users.some(user => user.email === email);

  if (loginExists) {
    setErrorMessage('Користувач з таким логіном вже існує.');
    return;
  }

  if (emailExists) {
    setErrorMessage('Користувач з такою електронною адресою вже зареєстрований.');
    return;
  }

  const newUser = {
    id: Date.now(),
    login,
    email,
    password,
    profileImage: profileImage || '/userProfileImage.jpg',
    stories: [],
    comments: []
  };

  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));

  setSuccessMessage('Реєстрація успішна! Тепер ви можете натиснути "Увійти" у верхньому меню, щоб авторизуватись.');
};


  return (
    <div className={styles.loginFormContainer}>
      <h1>Реєстрація</h1>
      {!showLogin ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Поля форми */}
          <div className={styles.formGroup}>
            <label htmlFor="login">Логін:</label>
            <input type="text" id="login" className={styles.input} value={login} onChange={(e) => setLogin(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Ел. адреса:</label>
            <input type="email" id="email" className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password">Пароль:</label>
            <input type="password" id="password" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Фото профіля:</label>
            <input type="file" id="image" className={styles.input} accept="image/*" onChange={handleImageChange} />
            {profileImage && (
              <img src={profileImage} alt="Preview" className={styles.imagePreview} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
            )}
          </div>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
          <Button type="submit" variant="blue">Зареєструватися</Button>
        </form>
      ) : (
        <LoginForm onClose={closeLoginForm} />
      )}
    </div>
  );
};

export default RegistPage;