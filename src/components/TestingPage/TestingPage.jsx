// src/components/TestingPage/TestingPage.jsx
import React, { useState, useEffect } from 'react'; // useEffect все ще потрібен для isTestCompleted, але не для currentUser
import styles from './TestingPage.module.css';
import UserProfile from '../UserProfile/UserProfile';
import Button from '../Button/Button';
import PostTestForm from '../PostTestForm/PostTestForm';
// import { useNavigate } from 'react-router-dom'; // Все ще не потрібен

const TestingPage = () => {
  // const navigate = useNavigate(); // Все ще не потрібен
  const [currentUser, setCurrentUser] = useState(null); // Ми встановимо це з localStorage один раз, коли компонент монтується
  const [showPostTestForm, setShowPostTestForm] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  // **** ЦЕЙ useEffect ПОВИНЕН БУТИ ЗМІНЕНИЙ / ОЧИЩЕНИЙ ****
  // **** Тепер він лише ЗЧИТУЄ currentUser, а не ПЕРЕВІРЯЄ АВТОРИЗАЦІЮ ****
  // **** ProtectedRoute вже гарантує, що користувач авторизований, якщо цей компонент рендериться.
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Логіка для обробки profileImage з BASE_URL
        if (parsedUser.profileImage && parsedUser.profileImage.startsWith('/')) {
          parsedUser.profileImage = import.meta.env.BASE_URL + parsedUser.profileImage.substring(1);
        }
        setCurrentUser(parsedUser); // Встановлюємо дані користувача
      } catch (error) {
        console.error('Помилка при парсингу loggedInUser з localStorage у TestingPage:', error);
        // Якщо тут є помилка парсингу, це може вказувати на пошкодження даних.
        // ProtectedRoute вже мав би це відловити, але це як запасний механізм.
        localStorage.removeItem('loggedInUser');
        setCurrentUser(null); // Якщо дані пошкоджені, currentUser буде null
      }
    }
    // else { // Цей else блок повністю зайвий, бо ProtectedRoute вже перенаправив би
    //   setCurrentUser(null);
    // }
  }, []); // [] означає, що ефект запускається лише один раз після першого рендеру

  const navigationItems = [{ label: 'Тестування', to: '/testing' }];
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEAWpiizFlEEBFO0GW5B0nljyeGzmAebOL0ZaX7NZ-hrYQvA/viewform?embedded=true";

  const handleGoToPostTestForm = () => {
    setShowPostTestForm(true);
    console.log('Кнопку "Перейти" натиснуто. Відкриваю PostTestForm.');
  };

  const handleClosePostTestForm = () => {
    setShowPostTestForm(false);
    console.log('PostTestForm закрита.');
  };

  // Ця перевірка `if (!currentUser)` тепер буде спрацьовувати, якщо:
  // 1. Дані користувача ще не завантажились з localStorage (перший рендер).
  // 2. Була помилка парсингу localStorage, і currentUser був встановлений в null.
  // В ідеалі, це має бути дуже короткочасний стан, або ж він вказує на проблему.
  if (!currentUser) {
    return (
      <div className={styles.testingContainer}>
        <p>Завантаження даних користувача...</p>
      </div>
    );
  }

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
        user={currentUser} // currentUser тепер завжди буде об'єктом користувача тут
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
              Після проходження тесту поставте галочку нижче, щоб продовжити:
            </p>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={isTestCompleted}
                onChange={(e) => setIsTestCompleted(e.target.checked)}
              />
              Я пройшов(-ла) тест
            </label>

            <Button
              variant="blue"
              onClick={handleGoToPostTestForm}
              className={styles.goToMaterialsButton}
              disabled={!isTestCompleted}
            >
              Перейти
            </Button>
          </>
        ) : (
          <PostTestForm onClose={handleClosePostTestForm} />
        )}
      </section>
    </div>
  );
};

export default TestingPage;