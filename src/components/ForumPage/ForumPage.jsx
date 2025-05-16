import React, { useState } from 'react';
import styles from './ForumPage.module.css';
import UserProfile from '../UserProfile/UserProfile';
import Button from '../Button/Button';
import forumStoriesData from './forumStoriesData'; // Імпортуємо дані

const ForumPage = () => {
  const user = {
    login: 'Tarabakina',
    email: 'tarabyta@gmail.com',
    profileImage: '/userProfileImage.jpg',
  };

  const navigationItems = [
    { label: 'Форум' },
  ];

  const topics = ["Всі", "Особисті", "Травма", "Стрес", "Відновлення", "Адаптація", "Підтримка"];
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [likes, setLikes] = useState({});
  const [commentFormsVisible, setCommentFormsVisible] = useState({});
  const [comments, setComments] = useState({});

  // Використовуємо імпортовані дані
  const filteredStories = selectedTopic
    ? forumStoriesData.filter((story) => story.topic === selectedTopic)
    : forumStoriesData;

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic === "Всі" ? null : topic);
  };

  const handleLike = (storyId) => {
    setLikes(prevLikes => ({
      ...prevLikes,
      [storyId]: (prevLikes[storyId] || 0) + 1,
    }));
    console.log(`Лайк історії ${storyId}`);
  };

  const handleCommentClick = (storyId) => {
    setCommentFormsVisible(prevVisibility => ({
      ...prevVisibility,
      [storyId]: !prevVisibility[storyId],
    }));
  };

  const handleCommentChange = (event, storyId) => {
    setComments(prevComments => ({
      ...prevComments,
      [storyId]: event.target.value,
    }));
  };

  const handlePostComment = (storyId) => {
    const commentText = comments[storyId];
    if (commentText) {
      console.log(`Коментар до історії ${storyId}:`, commentText);
      setComments(prevComments => ({ ...prevComments, [storyId]: '' }));
      setCommentFormsVisible(prevVisibility => ({ ...prevVisibility, [storyId]: false }));
    }
  };

  return (
    <div className={styles.forumContainer}>
      {/* Перша секція - Головний екран */}
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Форум, де можна почитати історії інших</h1>
        <p className={styles.heroText}>
          Ми прагнемо, аби цей простір допоміг вам бути почутими, давши шанс на полегшення.
        </p>
        <div className={styles.heroBackground} />
      </section>

      {/* Друга секція - Профіль користувача та навігація */}
      <UserProfile user={user} navigationItems={navigationItems} activeItem="Форум" />

      {/* Третя секція - Перелік тематик та історії */}
      <section className={styles.storiesSection}>
        <div className={styles.topicsColumn}>
          <h2 className={styles.topicsTitle}>Тематики</h2>
          <ul className={styles.topicsList}>
            {topics.map((topic) => (
              <li
                key={topic}
                className={styles.topicItem}
                onClick={() => handleTopicClick(topic)}
                style={{ fontWeight: selectedTopic === topic ? 'bold' : 'normal' }}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.storiesColumn}>
          <h2 className={styles.storiesTitle}>Історії {selectedTopic && `(${selectedTopic})`}</h2>
          {filteredStories.map((story) => (
            <div key={story.id} className={styles.storyCard}>
              <div className={styles.authorInfo}>
                <img src={story.author.photo} alt={story.author.name} className={styles.authorPhoto} />
                <div className={styles.authorDetails}>
                  <h3 className={styles.authorName}>{story.author.name}</h3>
                  <p className={styles.authorEmail}>{story.author.email}</p>
                </div>
              </div>
              {story.title && <h4 className={styles.storyTitle}>{story.title}</h4>}
              <p className={styles.storyText}>{story.text}</p>
              <div className={styles.storyMeta}>
                <span className={styles.storyTopic}>{story.topic}</span>
                <div className={styles.storyActions}>
                  <Button variant="icon" onClick={() => handleLike(story.id)}>
                    ❤️ {likes[story.id] || story.likes}
                  </Button>
                  <Button variant="icon" onClick={() => handleCommentClick(story.id)}>
                    💬 {story.comments}
                  </Button>
                </div>
              </div>
              {commentFormsVisible[story.id] && (
                <div className={styles.commentForm}>
                  <textarea
                    value={comments[story.id] || ''}
                    onChange={(e) => handleCommentChange(e, story.id)}
                    placeholder="Напишіть свій коментар..."
                  />
                  <Button variant="blue" onClick={() => handlePostComment(story.id)}>Відправити</Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ForumPage;