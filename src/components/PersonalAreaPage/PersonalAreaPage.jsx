// components/PersonalAreaPage/PersonalAreaPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './PersonalAreaPage.module.css';
import Button from '../Button/Button';
import UserProfile from '../UserProfile/UserProfile';
import { useNavigate } from 'react-router-dom';

const PersonalAreaPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [userPersonalStories, setUserPersonalStories] = useState([]);
  const [showPersonalStories, setShowPersonalStories] = useState(false);
  const [expandedStories, setExpandedStories] = useState({});


  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);

        const allUserStories = JSON.parse(localStorage.getItem('userStories')) || [];
        const filteredPersonalStories = allUserStories.filter(
          story => story.author.login === parsedUser.login
        );
        setUserPersonalStories(filteredPersonalStories);

      } catch (error) {
        console.error('Помилка при парсингу loggedInUser з localStorage', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
      console.log('Користувач не авторизований. Перенаправлення на сторінку входу.');
    }
  }, [navigate]);

  const handleDeleteStory = (storyId) => {
    if (!currentUser) return;

    const updatedPersonalStories = userPersonalStories.filter(story => story.id !== storyId);
    setUserPersonalStories(updatedPersonalStories);

    const allStoredStories = JSON.parse(localStorage.getItem('userStories')) || [];
    const updatedAllStoredStories = allStoredStories.filter(
      story => !(story.id === storyId && story.author.login === currentUser.login)
    );
    localStorage.setItem('userStories', JSON.stringify(updatedAllStoredStories));

    setExpandedStories(prev => {
        const newExpanded = { ...prev };
        delete newExpanded[storyId];
        return newExpanded;
    });
  };

  const toggleExpand = (storyId) => {
    setExpandedStories(prev => ({
      ...prev,
      [storyId]: !prev[storyId]
    }));
  };

  if (!currentUser) {
    return (
      <div className={styles.personalAreaContainer}>
        <p>Завантаження даних користувача або перевірка авторизації...</p>
      </div>
    );
  }

  const navigationItems = [
    { label: 'Форум', to: '/forum' },
    { label: 'Тестування', to: '/testing' },
    { label: 'Матеріали', to: '/library' },
    { label: 'Щоденник', to: '/diary' },
  ];

  const topicColors = {
    'Травма': '#FF6B6B',
    'Стрес': '#FFD166',
    'Відновлення': '#06D6A0',
    'Адаптація': '#118AB2',
    'Підтримка': '#8338EC',
    'Без тематики': '#CCCCCC'
  };

  return (
    <div className={styles.personalAreaContainer}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Твій безпечний простір</h1>
        <p className={styles.heroText}>
          Ми допоможемо пройти складний етап та знайти відповіді на болючі запитання.
        </p>
        <Button variant="blue" onClick={() => navigate('/diary')}>
          Написати історію
        </Button>
        <div className={styles.heroBackground} />
      </section>

      {/* Секція UserProfile */}
      <UserProfile user={currentUser} navigationItems={navigationItems} activeItem="Особистий кабінет" showBackButton={true} />

      {/* Окремий блок для кнопки перемикання історій */}
      <div className={styles.personalStoriesToggleButtonBlock}> {/* Новий клас для блоку з фоном */}
        <Button
          variant="blue"
          onClick={() => setShowPersonalStories(prev => !prev)}
          className={styles.toggleStoriesButton}
        >
          {showPersonalStories ? 'Згорнути мої історії' : 'Перегляд особистих історій'}
        </Button>
      </div>

      {/* Секція "Мої історії", яка відображається за умовою */}
      {showPersonalStories && (
        <section className={styles.personalStoriesSection}> {/* Фон цієї секції буде рожевим */}
          <h2 className={styles.personalStoriesTitle}>Мої історії</h2>
          {userPersonalStories.length > 0 ? (
            <div className={styles.storiesGrid}>
              {userPersonalStories.map(story => (
                <div key={story.id} className={styles.storyCard}>
                  <div className={styles.authorInfo}>
                    <img
                      src={story.author.profileImage || '/default-user.jpg'}
                      alt={story.author.login}
                      className={styles.authorPhoto}
                    />
                    <div className={styles.authorDetails}>
                      <h3 className={styles.authorName}>{story.author.login}</h3>
                      <p className={styles.authorEmail}>{story.author.email}</p>
                    </div>
                  </div>
                  {story.title && <h4 className={styles.storyTitle}>{story.title}</h4>}
                  <p className={styles.storyText}>
                    {expandedStories[story.id]
                      ? story.text
                      : `${story.text.split('. ').slice(0, 3).join('. ')}${story.text.split('. ').length > 3 ? '...' : ''}`}
                  </p>
                  {story.text.split('. ').length > 3 && (
                    <button
                      className={styles.expandButton}
                      onClick={() => toggleExpand(story.id)}
                    >
                      {expandedStories[story.id] ? '▲ Згорнути' : '▼ Читати далі'}
                    </button>
                  )}
                  <div className={styles.storyMeta}>
                    <span
                      className={styles.storyTopic}
                      style={{ color: topicColors[story.topic] || '#333' }}
                    >
                      {story.topic}
                    </span>
                    <Button
                      variant="transparent"
                      onClick={() => handleDeleteStory(story.id)}
                      className={styles.deleteButton}
                    >
                      Видалити
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noStoriesMessage}>Ви ще не написали жодної особистої історії.</p>
          )}
        </section>
      )}
    </div>
  );
};

export default PersonalAreaPage;