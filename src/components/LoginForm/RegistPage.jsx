// components/LoginForm/RegistPage.js
import React, { useState } from 'react'; // Додаємо useState
import styles from './RegistPage.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const RegistPage = () => {
  const navigate = useNavigate();

  // Стан для полів форми
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(''); // Для збереження Data URL зображення
  const [errorMessage, setErrorMessage] = useState(''); // Для відображення повідомлень про помилки
  const [successMessage, setSuccessMessage] = useState(''); // Для повідомлень про успішну реєстрацію

  // Обробник зміни файлу (зображення профілю)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Зберігаємо зображення як Data URL
      };
      reader.readAsDataURL(file); // Читаємо файл як Data URL
    } else {
      setProfileImage('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage(''); // Очищаємо попередні помилки
    setSuccessMessage(''); // Очищаємо попередні повідомлення про успіх

    // Проста валідація
    if (!login || !email || !password) {
      setErrorMessage('Будь ласка, заповніть всі обов\'язкові поля (логін, email, пароль).');
      return;
    }

    // Отримання існуючих користувачів з localStorage
    // `JSON.parse` перетворює рядок назад на масив об'єктів.
    // Якщо `users` немає в localStorage, то `JSON.parse` поверне `null` або помилку, тому використовуємо `|| []`
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Перевірка на унікальність логіну та email
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

    // Створення нового об'єкта користувача
    const newUser = {
      id: Date.now(), // Простий унікальний ID
      login,
      email,
      password, // У реальному проекті паролі хешуються на бекенді!
      profileImage: profileImage || '/userProfileImage.jpg', // Використовуємо завантажене або дефолтне зображення
      // Додаємо порожні масиви для майбутніх історій та коментарів
      stories: [],
      comments: []
    };

    // Додавання нового користувача до масиву
    users.push(newUser);

    // Зберігання оновленого масиву користувачів у localStorage
    // `JSON.stringify` перетворює масив об'єктів на рядок для збереження в localStorage.
    localStorage.setItem('users', JSON.stringify(users));

    setSuccessMessage('Реєстрація успішна! Тепер ви можете увійти.');
    // Перенаправляємо на сторінку входу після успішної реєстрації
    // Затримка для того, щоб користувач встиг прочитати повідомлення
    setTimeout(() => {
      navigate('/login'); // Припускаємо, що у вас є маршрут '/login' для входу
    }, 2000); // Перенаправлення через 2 секунди
  };

  return (
    <div className={styles.loginFormContainer}>
      <h1>Реєстрація</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="login">Логін:</label>
          <input
            type="text"
            id="login"
            name="login"
            className={styles.input}
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Ел. адреса:</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Пароль:</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="image">Фото профіля:</label>
          <input
            type="file"
            id="image"
            name="image"
            className={styles.input}
            accept="image/*"
            onChange={handleImageChange} // Додаємо обробник зміни файлу
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="Preview"
              className={styles.imagePreview} // Додайте цей клас до CSS
              style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px', borderRadius: '50%' }}
            />
          )}
        </div>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>} {/* Додаємо повідомлення про успіх */}
        <Button type="submit" variant="blue">
          Зареєструватися
        </Button>
      </form>
    </div>
  );
};

export default RegistPage;