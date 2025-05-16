// components/PersonalAreaPage/PersonalAreaPage.jsx
import React from 'react';
import styles from './PersonalAreaPage.module.css';
import Button from '../Button/Button';
import UserProfile from '../UserProfile/UserProfile';

const PersonalAreaPage = () => {
  const user = {
    login: 'Tarabakina',
    email: 'tarabyta@gmail.com',
    profileImage: '/userProfileImage.jpg',
  };

  const navigationItems = [
    { label: 'Форум', to: '/forum' },
    { label: 'Тестування', onClick: () => console.log('Тестування') },
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
        <UserProfile user={user} navigationItems={navigationItems} />

    </div>
  );
};

export default PersonalAreaPage;