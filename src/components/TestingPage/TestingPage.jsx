import React, { useState, useEffect } from 'react'; // import useState
import styles from './TestingPage.module.css';
import UserProfile from '../UserProfile/UserProfile';
import Button from '../Button/Button';
import PostTestForm from '../PostTestForm/PostTestForm'; // імпортуємо PostTestForm

const TestingPage = () => {
  const user = {
    login: 'Tarabakina',
    email: 'tarabyta@gmail.com',
    profileImage: '/userProfileImage.jpg',
  };

  const navigationItems = [
    { label: 'Тестування' },
  ];

  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScEAWpiizFlEEBFO0GW5B0nljyeGzmAebOL0ZaX7NZ-hrYQvA/viewform?embedded=true";

  // Стан для контролю видимості PostTestForm
  const [showPostTestForm, setShowPostTestForm] = useState(false);

  // Функція, яка буде викликатися при натисканні кнопки "Перейти"
  const handleGoToPostTestForm = () => {
    setShowPostTestForm(true); // Показуємо форму PostTestForm
    console.log('Кнопку "Перейти" натиснуто. Відкриваю PostTestForm.');
  };

  // Функція для закриття PostTestForm
  const handleClosePostTestForm = () => {
    setShowPostTestForm(false);
    console.log('PostTestForm закрита.');
  };

  return (
    <div className={styles.testingContainer}>
      {/* Перша секція - Головний екран */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Психологічне тестування після ДТП</h1>
        <p className={styles.heroText}>
          Цей тест допоможе краще зрозуміти ваш психологічний стан та виявити потреби в підтримці.
        </p>
        <div className={styles.heroBackground} /> {/* Для фонового зображення */}
      </section>

      {/* Секція Профілю користувача та навігації */}
      {/* showBackButton={true} додаємо, щоб стрілка відображалась */}
      <UserProfile user={user} navigationItems={navigationItems} activeItem="Тестування" showBackButton={true} />

      {/* Секція Тестування */}
      <section className={styles.testSection}>
        {/* Умовний рендеринг: показуємо Google Form АБО PostTestForm */}
        {!showPostTestForm ? ( // Якщо showPostTestForm false, показуємо Google Form
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
              onClick={handleGoToPostTestForm} // Викликаємо нову функцію
              className={styles.goToMaterialsButton} // Можливо, захочете змінити назву класу
            >
              Перейти
            </Button>
          </>
        ) : ( // Інакше, якщо showPostTestForm true, показуємо PostTestForm
          <PostTestForm
            onClose={handleClosePostTestForm} // Передаємо функцію для закриття форми
          />
        )}
      </section>
    </div>
  );
};

export default TestingPage;