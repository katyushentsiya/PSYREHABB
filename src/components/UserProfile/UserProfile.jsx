import React from 'react';
import styles from './UserProfile.module.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

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
          item.to ? (
            <Link key={item.label} to={item.to} className={styles.navLink}>
              <Button
                variant="transparent"
                className={item.label === activeItem ? styles.activeNavButton : ''}
              >
                {item.label}
              </Button>
            </Link>
          ) : (
            <Button
              key={item.label}
              variant="transparent"
              onClick={item.onClick}
              className={item.label === activeItem ? styles.activeNavButton : ''}
            >
              {item.label}
            </Button>
          )
        ))}
      </nav>
    </section>
  );
};

export default UserProfile;