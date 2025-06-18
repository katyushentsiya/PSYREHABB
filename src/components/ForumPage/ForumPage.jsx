import React, { useState, useEffect } from 'react';
import styles from './ForumPage.module.css';
import UserProfile from '../UserProfile/UserProfile';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const ForumPage = ({ forumStories }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [stories, setStories] = useState([]);

  const [likes, setLikes] = useState(() => {
    const initialLikesData = {};
    forumStories.forEach(story => {
      initialLikesData[story.id] = story.initialLikes || 0;
    });

    const storedUserLikes = JSON.parse(localStorage.getItem('userLikesCounts')) || {};
    const mergedLikes = { ...initialLikesData }; 

    for (const storyId in storedUserLikes) {
        mergedLikes[storyId] = (mergedLikes[storyId] || 0) + storedUserLikes[storyId];
    }
    return mergedLikes;
  });

  const [userLikedStories, setUserLikedStories] = useState(() => {
    const storedUserLikedState = JSON.parse(localStorage.getItem('userLikedStoriesState')) || {};
    const currentLoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))?.login || 'anonymous';

    return storedUserLikedState[currentLoggedInUser] || {};
  });


  const [commentFormsVisible, setCommentFormsVisible] = useState({});
  const [comments, setComments] = useState({});

  const [allComments, setAllComments] = useState(() => {
    const userStoredComments = JSON.parse(localStorage.getItem('userAddedForumComments')) || {};
    const mergedComments = {};

    forumStories.forEach(story => {
      if (story.comments && story.comments.length > 0) {
        mergedComments[story.id] = story.comments.map(comment => ({
          author: comment.author,
          text: comment.text,
          date: comment.date || 'Дата невідома'
        }));
      }
    });

    for (const storyId in userStoredComments) {
        if (mergedComments[storyId]) {
            mergedComments[storyId] = [...mergedComments[storyId], ...userStoredComments[storyId]];
        } else {
            mergedComments[storyId] = userStoredComments[storyId];
        }
    }
    return mergedComments;
  });

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [expandedStories, setExpandedStories] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }

    const savedStories = JSON.parse(localStorage.getItem('userStories')) || [];
    const combined = [...forumStories, ...savedStories];
    setStories(combined);
  }, [forumStories, navigate]);

  useEffect(() => {
    if (currentUser) {
        const currentLoggedInUser = currentUser.login || 'anonymous';
        const allUsersLikedState = JSON.parse(localStorage.getItem('userLikedStoriesState')) || {};
        allUsersLikedState[currentLoggedInUser] = userLikedStories;
        localStorage.setItem('userLikedStoriesState', JSON.stringify(allUsersLikedState));
    }
  }, [userLikedStories, currentUser]);

  useEffect(() => {
    const userLikesCountsToSave = {};
    forumStories.forEach(story => {
        const initialCount = story.initialLikes || 0;
        const currentCount = likes[story.id] || 0;
        const userAddedCount = currentCount - initialCount;

        if (userAddedCount !== 0) { 
            userLikesCountsToSave[story.id] = userAddedCount;
        }
    });
    localStorage.setItem('userLikesCounts', JSON.stringify(userLikesCountsToSave));
  }, [likes, forumStories]);


  const allTopics = ['Всі', ...new Set(stories.map(story => story.topic).filter(topic => topic !== 'Особисті'))];

  const filteredStories = selectedTopic
    ? stories.filter(story => story.topic === selectedTopic)
    : stories;

  const handleTopicClick = topic => {
    setSelectedTopic(topic === 'Всі' ? null : topic);
  };

  const handleLike = storyId => {
    if (!currentUser) {
        alert('Будь ласка, увійдіть, щоб поставити лайк.');
        return; 
    }

    const hasLiked = userLikedStories[storyId];

    if (hasLiked) {

      setLikes(prev => ({
        ...prev,
        [storyId]: Math.max(0, (prev[storyId] || 0) - 1) 
      }));
      setUserLikedStories(prev => ({
        ...prev,
        [storyId]: false 
      }));
    } else {

      setLikes(prev => ({
        ...prev,
        [storyId]: (prev[storyId] || 0) + 1
      }));
      setUserLikedStories(prev => ({
        ...prev,
        [storyId]: true 
      }));
    }
  };


  const handleCommentClick = storyId => {
    setCommentFormsVisible(prev => ({
      ...prev,
      [storyId]: !prev[storyId]
    }));
  };

  const handleCommentChange = (e, storyId) => {
    setComments(prev => ({
      ...prev,
      [storyId]: e.target.value
    }));
  };

  const handlePostComment = storyId => {
    const commentText = comments[storyId]?.trim();
    if (!commentText) return;

    const newComment = {
      author: currentUser.login || currentUser.name || 'Анонім',
      text: commentText,
      date: new Date().toLocaleString()
    };

    const updatedComments = {
      ...allComments,
      [storyId]: [...(allComments[storyId] || []), newComment]
    };
    setAllComments(updatedComments);

    const userAddedCommentsToSave = {};
    for (const id in updatedComments) {
        const fixedStoryComments = forumStories.find(s => s.id === parseInt(id))?.comments || [];
        userAddedCommentsToSave[id] = updatedComments[id].filter(comment =>
            !fixedStoryComments.some(fixedC =>
                fixedC.author === comment.author && fixedC.text === comment.text && fixedC.date === comment.date
            )
        );
        if (userAddedCommentsToSave[id].length === 0) {
            delete userAddedCommentsToSave[id];
        }
    }
    localStorage.setItem('userAddedForumComments', JSON.stringify(userAddedCommentsToSave));

    setComments(prev => ({ ...prev, [storyId]: '' }));
    setCommentFormsVisible(prev => ({ ...prev, [storyId]: false }));
  };

  const toggleExpand = storyId => {
    setExpandedStories(prev => ({
      ...prev,
      [storyId]: !prev[storyId]
    }));
  };

  const topicColors = {
    'Травма': '#FF6B6B',
    'Стрес': '#FFD166',
    'Відновлення': '#06D6A0',
    'Адаптація': '#118AB2',
    'Підтримка': '#8338EC',
    'Без тематики': '#CCCCCC'
  };

  if (!currentUser) {
    return <div className={styles.forumContainer}><p>Завантаження...</p></div>;
  }

  const navigationItems = [
    { label: 'Форум', to: '/forum' },
  ];

  return (
    <div className={styles.forumContainer}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Форум, де можна почитати історії інших</h1>
        <p className={styles.heroText}>
          Ми прагнемо, аби цей простір допоміг вам бути почутими, давши шанс на полегшення.
        </p>
        <div className={styles.heroBackground} />
      </section>

      <UserProfile user={currentUser} navigationItems={navigationItems} activeItem="Форум" showBackButton={true} />

      <section className={styles.storiesSection}>
        <div className={styles.topicsColumn}>
          <h2 className={styles.topicsTitle}>Тематики</h2>
          <ul className={styles.topicsList}>
            {allTopics.map(topic => (
              <li
                key={topic}
                className={styles.topicItem}
                onClick={() => handleTopicClick(topic)}
                style={{
                  fontWeight: selectedTopic === topic || (selectedTopic === null && topic === "Всі") ? 'bold' : 'normal',
                  color: topicColors[topic] || '#333'
                }}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.storiesColumn}>
          <h2 className={styles.storiesTitle}>Історії {selectedTopic && `(${selectedTopic})`}</h2>
          {filteredStories.length > 0 ? (
            filteredStories.map((story) => (
              <div key={story.id} className={styles.storyCard}>
                <div className={styles.authorInfo}>
                  <img
                    src={story.author.profileImage || story.author.photo || '/default-user.jpg'}
                    alt={story.author.login || story.author.name}
                    className={styles.authorPhoto}
                  />
                  <div className={styles.authorDetails}>
                    <h3 className={styles.authorName}>{story.author.login || story.author.name}</h3>
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
                  <span className={styles.storyTopic} style={{ color: topicColors[story.topic] || '#333' }}>
                    {story.topic}
                  </span>
                  <div className={styles.storyActions}>
                    {/* Оновлена кнопка лайка */}
                    <Button
                        variant="icon"
                        onClick={() => handleLike(story.id)}
  
                        style={{ color: userLikedStories[story.id] ? '#FF0000' : '#888' }} // Червоний або сірий
                    >
                      ❤️ {/* Смайлик сердечка */}
                      {likes[story.id] !== undefined ? likes[story.id] : story.initialLikes || 0}
                    </Button>
                    <Button variant="icon" onClick={() => handleCommentClick(story.id)}>
                      💬 {(allComments[story.id]?.length || 0)}
                    </Button>
                  </div>
                </div>

                {commentFormsVisible[story.id] && (
                  <div className={styles.commentForm}>
                    <div className={styles.commentList}>
                      {(allComments[story.id] || []).map((c, i) => (
                        <div key={`${story.id}-${i}`} className={styles.commentItem}>
                          <span className={styles.commentAuthor}>{c.author}</span>
                          <p className={styles.commentText}>{c.text}</p>
                          <span className={styles.commentDate}>{c.date}</span>
                        </div>
                      ))}
                    </div>
                    <textarea
                      value={comments[story.id] || ''}
                      onChange={(e) => handleCommentChange(e, story.id)}
                      placeholder="Напишіть свій коментар..."
                    />
                    <Button variant="blue" onClick={() => handlePostComment(story.id)}>Відправити</Button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>Немає історій для відображення за вибраною тематикою.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ForumPage;