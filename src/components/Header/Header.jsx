import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './Header.module.css';
import LoginForm from '../LoginForm/LoginForm';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginButtonClick = () => {
    setIsLoginFormVisible(true);
  };

  const handleCloseLoginForm = () => {
    setIsLoginFormVisible(false);
  };

  const handleLogoutButtonClick = () => {
    console.log('Вихід з особистого кабінету');
    navigate('/');
  };

const shouldShowLogout = location.pathname === '/personal-area' 
|| location.pathname === '/diary' 
|| location.pathname === '/forum';

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <h1>PsyRehab</h1>
        </div>
      </div>

      <nav className={styles.navigation}>
        <ul>
          <li><Link to="/#main-block-section">Головна</Link></li>
          <li><Link to="/#about-section">Про нас</Link></li>
          <li><Link to="/#services-section">Послуги</Link></li>
        </ul>
      </nav>

      <div className={styles.rightSection}>
        {shouldShowLogout ? (
          <Button variant="transparent" onClick={handleLogoutButtonClick}>
            Вийти
          </Button>
        ) : (
          isLoginFormVisible ? (
            <LoginForm onClose={handleCloseLoginForm} />
          ) : (
            <Button variant="transparent" onClick={handleLoginButtonClick}>
              Увійти
            </Button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
