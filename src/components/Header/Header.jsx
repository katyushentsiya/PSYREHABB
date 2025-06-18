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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
  }, []);

  const handleLoginButtonClick = () => {
    setIsLoginFormVisible(true);
    closeMobileMenu(); 
  };

  const handleCloseLoginForm = () => {
    setIsLoginFormVisible(false);
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  };

  const performLogout = () => { 
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    console.log('Вихід з особистого кабінету');
  };

  const handleLogoutButtonClick = () => { 
    setPendingNavigationPath('/'); 
    setIsLogoutConfirmModalOpen(true);
    closeMobileMenu();
  };

  const handleNavigationClick = (event, path) => {
    if (isLoggedIn && path !== '/personal-area') {
      event.preventDefault();
      setPendingNavigationPath(path);
      setIsLogoutConfirmModalOpen(true);
    }
    closeMobileMenu(); 
  };

  const handleConfirmLogoutAndNavigate = (path) => {
    performLogout(); 
    setIsLogoutConfirmModalOpen(false);
    setPendingNavigationPath(null);
    navigate(path);
    closeMobileMenu(); 
  };

  const handleCancelLogout = () => {
    setIsLogoutConfirmModalOpen(false);
    setPendingNavigationPath(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (isLoginFormVisible) {
      setIsLoginFormVisible(false);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.leftSection}>
          <div className={styles.logo}>
            <h1>
              <Link to="/" onClick={closeMobileMenu}>PsyRehab</Link>
            </h1>
          </div>
        </div>

        <nav className={`${styles.navigation} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <ul>
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

            {isLoggedIn && (
              <li><Link to="/personal-area" onClick={closeMobileMenu}>Особистий кабінет</Link></li>
            )}

            <li className={styles.mobileAuthButtons}>
              {isLoggedIn ? (
                <Button variant="transparent" onClick={handleLogoutButtonClick}> 
                  Вийти
                </Button>
              ) : (
                <Button variant="transparent" onClick={handleLoginButtonClick}>
                  Увійти
                </Button>
              )}
            </li>
          </ul>
       
          {isMobileMenuOpen && (
            <div className={styles.closeMobileMenu} onClick={toggleMobileMenu}>
              &times;
            </div>
          )}
        </nav>

        <div className={styles.rightSection}>
          {isLoggedIn ? (
            <Button variant="transparent" onClick={handleLogoutButtonClick}> {/* Changed onClick */}
              Вийти
            </Button>
          ) : (

            <Button variant="transparent" onClick={handleLoginButtonClick}>
              Увійти
            </Button>
          )}
        </div>

        {/* Кнопка гамбургер-меню (видима тільки на мобільних) */}
        <div className={styles.hamburgerMenu} onClick={toggleMobileMenu}>
          &#9776; {/* Unicode символ "три смужки" */}
        </div>
      </div>

      {/* Модальне вікно LoginForm - РЕНДЕРИТЬСЯ ТУТ (в корені Header) */}
      {isLoginFormVisible && <LoginForm onClose={handleCloseLoginForm} />}

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