// components/PersonalAreaPage/PersonalAreaPage.jsx
import React, { useState, useEffect } from 'react'; // Додаємо useEffect та useState
import styles from './PersonalAreaPage.module.css';
import Button from '../Button/Button';
import UserProfile from '../UserProfile/UserProfile';
import { useNavigate } from 'react-router-dom'; // Додаємо useNavigate для перенаправлення

const PersonalAreaPage = () => {
  const navigate = useNavigate();
  // Стан для зберігання даних поточного користувача
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // При завантаженні компонента, спробуйте отримати дані користувача з localStorage
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      // Якщо користувач не авторизований, перенаправляємо на сторінку входу
      // Або на головну, залежно від вашої логіки
      navigate('/login'); // Припускаємо, що у вас є маршрут '/login'
      console.log('Користувач не авторизований. Перенаправлення на сторінку входу.');
    }
  }, [navigate]); // Залежність від navigate, щоб useEffect перезапускався, якщо navigate змінюється (хоча це рідкість)

  // Якщо користувач ще не завантажений або не авторизований, можемо показати лоадер або нічого
  if (!currentUser) {
    return (
      <div className={styles.personalAreaContainer}>
        <p>Завантаження даних користувача або перевірка авторизації...</p>
      </div>
    );
  }

  // Якщо currentUser є, використовуємо його дані
  const navigationItems = [
    { label: 'Форум', to: '/forum' },
    { label: 'Тестування', to: '/testing' },
    { label: 'Матеріали', onClick: () => console.log('Матеріали') },
    { label: 'Щоденник', to: '/diary' },
  ];

  return (
    <div className={styles.personalAreaContainer}>
      {/* Перша секція - Головний екран */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Твій безпечний простір</h1>
        <p className={styles.heroText}>
          Ми допоможемо пройти складний етап та знайти відповіді на болючі запитання.
        </p>
        <Button variant="blue" onClick={() => console.log('Кнопку "Почати" натиснуто')}>
          Почати
        </Button>
        <div className={styles.heroBackground} /> {/* Для фонового зображення */}
      </section>

      {/* Друга секція - Дані користувача та навігація */}
      {/* Передаємо currentUser до UserProfile */}
      <UserProfile user={currentUser} navigationItems={navigationItems} />

    </div>
  );
};

export default PersonalAreaPage;