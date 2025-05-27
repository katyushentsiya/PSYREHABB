import React, { useState, useEffect } from 'react';
import styles from './DiaryEmotionsPage.module.css';
import UserProfile from '../UserProfile/UserProfile';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const DiaryEmotionsPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const [topic, setTopic] = useState('');

  const topicColors = {
    'Травма': '#FF6B6B',
    'Стрес': '#FFD166',
    'Відновлення': '#06D6A0',
    'Адаптація': '#118AB2',
    'Підтримка': '#8338EC',
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Помилка при парсингу loggedInUser з localStorage', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!currentUser) {
    return (
      <div className={styles.diaryEmotionsContainer}>
        <p>Завантаження даних користувача або перевірка авторизації...</p>
      </div>
    );
  }

  const navigationItems = [
    { label: 'Щоденник', to: '/diary' },
  ];

const handleSubmit = (e) => {
  e.preventDefault();

  if (!story) {
    alert('Будь ласка, напишіть свою історію.');
    return;
  }

  if (!topic) {
    alert('Будь ласка, виберіть тематику вашої історії.');
    return;
  }

  const newForumStory = {
    id: Date.now(),
    title: title || 'Без заголовка',
    text: story,
    topic,
    comments: 0,
    likes: 0,
    isUserCreated: true,
    author: {
      login: currentUser.login,
      email: currentUser.email,
      profileImage: currentUser.profileImage || '/default-user.jpg',
    },
  };

  const forumStories = JSON.parse(localStorage.getItem('userStories') || '[]');
  forumStories.push(newForumStory);
  localStorage.setItem('userStories', JSON.stringify(forumStories));

  setTitle('');
  setStory('');
  setTopic('');

  navigate('/forum');
};


  return (
    <div className={styles.diaryEmotionsContainer}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Напишіть свою історію</h1>
        <p className={styles.heroText}>
          Ми прагнемо, аби цей простір допоміг вам бути почутими, давши шанс на полегшення.
        </p>
        <div className={styles.heroBackground} />
      </section>

      <UserProfile user={currentUser} navigationItems={navigationItems} activeItem="Щоденник" showBackButton={true} />

      <section className={styles.diaryFormSection}>
        <form className={styles.diaryForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Напишіть заголовок історії (необов'язково):
            </label>
            <input
              type="text"
              id="title"
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="story" className={styles.label}>
              Напишіть свою історію (обов'язково):
            </label>
            <textarea
              id="story"
              className={styles.textarea}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="topic" className={styles.label}>
              Виберіть тематику своєї історії (обов'язково):
            </label>
            <div className={styles.topics}>
              {Object.keys(topicColors).map((topicName) => (
                <div className={styles.topicOption} key={topicName}>
                  <input
                    type="radio"
                    id={topicName}
                    name="topic"
                    value={topicName}
                    checked={topic === topicName}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  <label htmlFor={topicName} style={{ color: topicColors[topicName] }}>
                    {topicName}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" variant="blue">
            Зберегти
          </Button>
        </form>
      </section>
    </div>
  );
};

export default DiaryEmotionsPage;
