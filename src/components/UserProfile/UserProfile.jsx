// components/UserProfile/UserProfile.jsx
import React from 'react';
import styles from './UserProfile.module.css';
import Button from '../Button/Button'; // Імпорт вашого Button компонента
import { Link } from 'react-router-dom'; // Цей імпорт тут може бути не потрібен, якщо Link використовується лише в Button

const UserProfile = ({ user, navigationItems, activeItem }) => {
  if (!user) {
    return null;
  }

  return (
    <section className={styles.userSection}>
      <div className={styles.userProfile}>
        <img
          src={user.profileImage}
          alt="Фото профілю"
          className={styles.profileImage}
        />
        <div className={styles.userInfo}>
          <h2 className={styles.userLogin}>{user.login}</h2>
          <p className={styles.userEmail}>{user.email}</p>
        </div>
      </div>
      <nav className={styles.userNavigation}>
        {navigationItems && navigationItems.map((item) => (
          // Тепер просто рендеримо Button і передаємо 'to' як пропс
          <Button
            key={item.label}
            variant="transparent" // Або "blue", залежить від бажаного вигляду
            onClick={item.onClick}
            to={item.to} // Передаємо пропс 'to' безпосередньо до Button
            className={item.label === activeItem ? styles.activeNavButton : ''}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </section>
  );
};

export default UserProfile;