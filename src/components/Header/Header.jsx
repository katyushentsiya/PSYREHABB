import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';
import styles from './Header.module.css';
import LoginForm from '../LoginForm/LoginForm';
import LogoutConfirmModal from '../LogoutConfirmModal/LogoutConfirmModal';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [isLogoutConfirmModalOpen, setIsLogoutConfirmModalOpen] = useState(false);
  const [pendingNavigationPath, setPendingNavigationPath] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Примусовий вихід користувача при кожному завантаженні сторінки
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
  }, []);

  const handleLoginButtonClick = () => {
    setIsLoginFormVisible(true);
  };

  const handleCloseLoginForm = () => {
    setIsLoginFormVisible(false);
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    console.log('Вихід з особистого кабінету');
    navigate('/');
  };

  const handleNavigationClick = (event, path) => {
    // Якщо користувач авторизований І шлях не є "/personal-area"
    // тоді показуємо модальне вікно.
    // Шлях "/register" вже не потрібно перевіряти, бо його немає у навігації.
    if (isLoggedIn && path !== '/personal-area') {
      event.preventDefault();
      setPendingNavigationPath(path);
      setIsLogoutConfirmModalOpen(true);
    }
  };

  const handleConfirmLogoutAndNavigate = (path) => {
    handleLogout();
    setIsLogoutConfirmModalOpen(false);
    setPendingNavigationPath(null);
    navigate(path);
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmModalOpen(false);
    setPendingNavigationPath(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <h1>PsyRehab</h1>
        </div>
      </div>

      <nav className={styles.navigation}>
        <ul>
          {/* Ваші оригінальні якірні посилання */}
          <li>
            <Link to="/#main-block-section" onClick={(e) => handleNavigationClick(e, '/')}>
              Головна
            </Link>
          </li>
          <li>
            <Link to="/#about-section" onClick={(e) => handleNavigationClick(e, '/#about-section')}>
              Про нас
            </Link>
          </li>
          <li>
            <Link to="/#services-section" onClick={(e) => handleNavigationClick(e, '/#services-section')}>
              Послуги
            </Link>
          </li>

          {/* Тепер відображаємо "Особистий кабінет" ТІЛЬКИ якщо користувач авторизований */}
          {isLoggedIn && (
            <li><Link to="/personal-area">Особистий кабінет</Link></li>
          )}
          {/* Посилання на "Реєстрацію" повністю видалено з навігації */}
        </ul>
      </nav>

      <div className={styles.rightSection}>
        {isLoggedIn ? ( // Якщо користувач авторизований, показуємо кнопку "Вийти"
          <Button variant="transparent" onClick={handleLogout}>
            Вийти
          </Button>
        ) : ( // Якщо не авторизований, показуємо кнопку "Увійти" або форму
          isLoginFormVisible ? (
            <LoginForm onClose={handleCloseLoginForm} />
          ) : (
            <Button variant="transparent" onClick={handleLoginButtonClick}>
              Увійти
            </Button>
          )
        )}
      </div>

      {/* Модальне вікно підтвердження виходу */}
      <LogoutConfirmModal
        isOpen={isLogoutConfirmModalOpen}
        onConfirm={handleConfirmLogoutAndNavigate}
        onCancel={handleCancelLogout}
        targetPath={pendingNavigationPath}
      />
    </header>
  );
};

export default Header;
