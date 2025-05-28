import React, { useEffect, useState } from 'react';
import styles from './MaterialsPage.module.css';
import UserProfile from '../UserProfile/UserProfile';
import { useNavigate } from 'react-router-dom';

const predefinedMaterials = [
  {
    title: 'Як впоратись зі стресом після аварії',
    url: 'https://example.com/stress-recovery-guide',
    category: 'Стрес',
  },
  {
    title: 'Техніки глибокого дихання',
    url: 'https://example.com/breathing-techniques',
    category: 'Стрес',
  },
  {
    title: 'Що таке депресія і як її розпізнати',
    url: 'https://example.com/understanding-depression',
    category: 'Депресія',
  },
  {
    title: 'Відео: Переживання ПТСР після ДТП',
    url: 'https://www.youtube.com/watch?v=example',
    category: 'Травма після ДТП',
  },
  {
    title: 'Підтримка після психічної травми',
    url: 'https://example.com/psychological-support',
    category: 'Інше',
  },
];

const MaterialsPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Помилка при парсингу користувача', err);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const navigationItems = [{ label: 'Матеріали', to: '/materials' }];

  if (!currentUser) {
    return <p>Завантаження...</p>;
  }

  const categories = ['Стрес', 'Депресія', 'Травма після ДТП', 'Інше'];

  return (
    <div className={styles.materialsContainer}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroTitle}>Освітні матеріали</h1>
        <p className={styles.heroText}>
          Перегляньте перевірені ресурси, що допомагають подолати наслідки стресу, депресії чи травми після ДТП.
        </p>
        <div className={styles.heroBackground} />
      </section>

      <UserProfile
        user={currentUser}
        navigationItems={navigationItems}
        activeItem="Матеріали"
        showBackButton={true}
      />

      <section className={styles.materialsListSection}>
        {categories.map((category) => {
          const filtered = predefinedMaterials.filter((m) => m.category === category);
          if (filtered.length === 0) return null;

          return (
            <div key={category} className={styles.categoryBlock}>
              <h2>{category}</h2>
              <ul className={styles.materialList}>
                {filtered.map((mat, index) => (
                  <li key={index} className={styles.materialItem}>
                    <a href={mat.url} target="_blank" rel="noopener noreferrer">
                      {mat.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default MaterialsPage;
