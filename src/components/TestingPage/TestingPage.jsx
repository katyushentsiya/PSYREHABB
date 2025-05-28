import React, { useState, useEffect } from 'react';
import styles from './TestingPage.module.css';
import UserProfile from '../UserProfile/UserProfile';
import Button from '../Button/Button';
import PostTestForm from '../PostTestForm/PostTestForm';
import { useNavigate } from 'react-router-dom';

const TestingPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showPostTestForm, setShowPostTestForm] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        if (parsedUser.profileImage && parsedUser.profileImage.startsWith('/')) {
            // Використовуємо import.meta.env.BASE_URL для статичних активів у Vite
            parsedUser.profileImage = import.meta.env.BASE_URL + parsedUser.profileImage.substring(1);
        }
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error('Помилка при парсингу loggedInUser з localStorage', error);
        localStorage.removeItem('loggedInUser');
        navigate('/login'); // <--- ЗМІНА: Використовуємо відносний шлях, react-router-dom обробить basename
      }
    } else {
      navigate('/login'); // <--- ЗМІНА: Використовуємо відносний шлях, react-router-dom обробить basename
      console.log('Користувач не авторизований. Перенаправлення на сторінку входу.');
    }
  }, [navigate]);

  // ЗМІНА: 'to' тепер також є відносним шляхом
  const navigationItems = [{ label: 'Тестування', to: '/testing' }];

  if (!currentUser) {
    return (
      <div className={styles.testingContainer}>
        <p>Завантаження даних користувача або перевірка авторизації...</p>
      </div>
    );
  }

  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEAWpiizFlEEBFO0GW5B0nljyeGzmAebOL0ZaX7NZ-hrYQvA/viewform?embedded=true";

  const handleGoToPostTestForm = () => {
    setShowPostTestForm(true);
    console.log('Кнопку "Перейти" натиснуто. Відкриваю PostTestForm.');
  };

  const handleClosePostTestForm = () => {
    setShowPostTestForm(false);
    console.log('PostTestForm закрита.');
  };

  return (
    <div className={styles.testingContainer}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Психологічне тестування після ДТП</h1>
        <p className={styles.heroText}>
          Цей тест допоможе краще зрозуміти ваш психологічний стан та виявити потреби в підтримці.
        </p>
        <div className={styles.heroBackground} />
      </section>

      <UserProfile
        user={currentUser}
        navigationItems={navigationItems}
        activeItem="Тестування"
        showBackButton={true}
      />

      <section className={styles.testSection}>
        {!showPostTestForm ? (
          <>
            <h2 className={styles.testTitle}>Будь ласка, заповніть форму:</h2>
            <div className={styles.googleFormWrapper}>
              <iframe
                src={googleFormUrl}
                width="100%"
                height="500px"
                title="Психологічний тест після ДТП"
                allowFullScreen
              >
                Завантаження...
              </iframe>
            </div>
            <p className={styles.noteText}>
              Ваші відповіді будуть конфіденційними. Щоб отримати добірку навчальних матеріалів, натисніть кнопку
            </p>
            <Button
              variant="blue"
              onClick={handleGoToPostTestForm}
              className={styles.goToMaterialsButton}
            >
              Перейти
            </Button>
          </>
        ) : (
          <PostTestForm
            onClose={handleClosePostTestForm}
          />
        )}
      </section>
    </div>
  );
};

export default TestingPage;