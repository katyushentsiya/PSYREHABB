import React from 'react';
import styles from './DiaryEmotionsPage.module.css';
import UserProfile from '../UserProfile/UserProfile';
import Button from '../Button/Button';

const DiaryEmotionsPage = () => {
  const user = {
    login: 'Tarabakina', // Ці дані можна буде передавати як пропси
    email: 'tarabyta@gmail.com',
    profileImage: '/userProfileImage.jpg',
  };

  const navigationItems = [
    { label: 'Щоденник' },
  ];

  return (
    <div className={styles.diaryEmotionsContainer}>
      {/* Перша секція - Головний екран */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Напишіть свою історію</h1>
        <p className={styles.heroText}>
          Ми прагнемо, аби цей простір допоміг вам бути почутими, давши шанс на полегшення.
        </p>
        <div className={styles.heroBackground} /> {/* Для фонового зображення */}
      </section>

      {/* Друга секція - Профіль користувача та кнопка "Щоденник" */}
      <UserProfile user={user} navigationItems={navigationItems} activeItem="Щоденник" />

      {/* Третя секція - Форма для введення запису */}
      <section className={styles.diaryFormSection}>
        <form className={styles.diaryForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Напишіть заголовок історії (необов'язково):
            </label>
            <input type="text" id="title" className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="story" className={styles.label}>
              Напишіть свою історію (обов'язково):
            </label>
            <textarea id="story" className={styles.textarea} required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="topic" className={styles.label}>
              Виберіть тематику своєї історії (необов'язково):
            </label>
            <div className={styles.topics}>
              <div className={styles.topicOption}>
                <input type="radio" id="feelings" name="topic" value="Почуття" />
                <label htmlFor="feelings">Травма</label>
              </div>
              <div className={styles.topicOption}>
                <input type="radio" id="relationships" name="topic" value="Стосунки" />
                <label htmlFor="relationships">Стрес</label>
              </div>
              <div className={styles.topicOption}>
                <input type="radio" id="work-study" name="topic" value="Робота/Навчання" />
                <label htmlFor="work-study">Відновлення</label>
              </div>
              <div className={styles.topicOption}>
                <input type="radio" id="achievements" name="topic" value="Досягнення" />
                <label htmlFor="achievements">Адаптація</label>
              </div>
              <div className={styles.topicOption}>
                <input type="radio" id="difficulties" name="topic" value="Труднощі" />
                <label htmlFor="difficulties">Підтримка</label>
              </div>
            </div>
          </div>

        <Button type="submit" variant="blue" >
          Зберегти
        </Button>
        </form>
      </section>
    </div>
  );
};

export default DiaryEmotionsPage;