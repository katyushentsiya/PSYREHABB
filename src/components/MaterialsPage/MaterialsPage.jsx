// src/components/MaterialsPage/MaterialsPage.jsx
import React, { useState, useEffect } from 'react';
import styles from './MaterialsPage.module.css';
import UserProfile from '../UserProfile/UserProfile';

const predefinedMaterials = [
  {
    title: 'EMDR терапія',
    url: 'https://youtu.be/cXJwnRBMezI?si=2JKZQ9tnS8eLe2Ta',
    category: 'Повторне переживання',
    recommendedFor: [3], 
  },
  {
    title: 'Як розпізнати ПТСР та кПТСР',
    url: 'https://youtu.be/d9td0ztyxE8?si=7uADyOPb9HRxvB0N',
    category: 'Інше',
  },
  {
    title: 'Як повернути внутрішній спокій',
    url: 'https://youtu.be/6csLkuAOjaM?si=bwtjR7phzZdVklcn',
    category: 'Повторне переживання',
    recommendedFor: [3,4], // Для тих, кого майже не вплинуло
  },
  {
    title: 'Основні техніки когнітивно-поведінкової терапії',
    url: 'http://dspace.pnpu.edu.ua/bitstream/123456789/15108/1/40.pdf',
    category: 'Зміни в емоціях і мисленні',
    recommendedFor: [2],
  },
  {
    title: 'Комплекс дихальних вправ на зняття тривожності',
    url: 'https://mozok.ua/anxietydisorder/article/4025-vpravi-na-znyattya-trivozhnost--efektivna--dostupna-metodika-podolannya-nep', // Змініть на реальний URL YouTube
    category: 'Профілактика та загальна підтримка',
    recommendedFor: [0],
  },
  {
    title: 'Прогресивна м`язова релаксація',
    url: 'https://ekhsuir.kspu.edu/server/api/core/bitstreams/786c22ae-c984-4f10-bc0c-6971d0746c02/content',
    category: 'Профілактика та загальна підтримка',
    recommendedFor: [0],
  },
  {
    title: 'Медитація від стресу. Відновлення сил',
    url: 'https://youtu.be/fW63B_9S-tY?si=sqmY-uOkAAs0Rf_m',
    category: 'Профілактика та загальна підтримка',
    recommendedFor: [0,4],
  },
  {
    title: 'Поступова експозиційна терапія',
    url: 'https://guidelines.moz.gov.ua/documents/3742',
    category: 'Уникнення',
    recommendedFor: [1],
  },
    {
    title: 'Психологічне уникненн: що це і як боротися?',
    url: 'https://lviv.media/zdorovya/76321-psihologichne-uniknennya-sho-ce-take-chim-vono-shkidlive-ta-yak-jogo-pozbavitisya/',
    category: 'Уникнення',
    recommendedFor: [1],
  },
    {
    title: 'Як впоратися з флешбеками?',
    url: 'https://samo.com.ua/blog/ya-boryusya-z-travmamy-mynulogo-yak-meni-vporatysya-z-fleshbekamy-108/',
    category: 'Повторне переживання',
    recommendedFor: [3],
  },
    {
    title: 'Способи досягнення психологічного благополуччя',
    url: 'https://lib.iitta.gov.ua/id/eprint/724758/1/%D0%9F%D0%BE%D1%81%D1%82%D1%82%D1%80%D0%B0%D0%B2%D0%BC%D0%B0%D1%82%D0%B8%D1%87%D0%BD%D0%B5_%D0%B6%D0%B8%D1%82%D1%82%D1%94%D1%82%D0%B2%D0%BE%D1%80%D0%B5%D0%BD%D0%BD%D1%8F_%D0%86%D0%A1%D0%9F%D0%9F_2_23_02_21%20%281%29.pdf',
    category: 'Інше',
  },
    {
    title: 'Том 1.Основи реабілітаційної психології',
    url: 'https://www.osce.org/files/f/documents/a/a/430805.pdf',
    category: 'Інше',
  },
    {
    title: 'Том 2.Основи реабілітаційної психології',
    url: 'https://emed.library.gov.ua/wp-content/uploads/tainacan-items/8476/45035/Osnovy-reabilitatsiynoi-psykholohii-.-T.-2.pdf',
    category: 'Інше',
  },
    {
    title: 'Том 3.Основи реабілітаційної психології',
    url: 'https://www.osce.org/files/f/documents/4/d/430841.pdf',
    category: 'Інше',
  },
      {
    title: 'Рекомендації щодо лікування гострої реакції на стрес',
    url: 'https://www.dec.gov.ua/wp-content/uploads/2024/07/kn_2024_ptsr.pdf',
    category: 'Інше',
  },

];

const MaterialsPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [lastTestScore, setLastTestScore] = useState(null); // Новий стан для зберігання результату тесту

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.profileImage && parsedUser.profileImage.startsWith('/')) {
          parsedUser.profileImage = import.meta.env.BASE_URL + parsedUser.profileImage.substring(1);
        }
        setCurrentUser(parsedUser);
      } catch (err) {
        console.error('Помилка при парсингу користувача з localStorage у MaterialsPage:', err);
        localStorage.removeItem('loggedInUser');
        setCurrentUser(null);
      }
    }

    // Зчитуємо останній результат тесту з localStorage
    const storedScore = localStorage.getItem('lastTestScore');
    if (storedScore) {
      try {
        setLastTestScore(JSON.parse(storedScore));
      } catch (err) {
        console.error('Помилка при парсингу lastTestScore з localStorage:', err);
        localStorage.removeItem('lastTestScore'); // Очищаємо, якщо пошкоджено
        setLastTestScore(null);
      }
    }
  }, []);

  const navigationItems = [{ label: 'Матеріали', to: '/library' }];

  if (!currentUser) {
    return <p>Завантаження даних користувача...</p>;
  }

  // Фільтрація рекомендованих матеріалів на основі lastTestScore
  const recommendedMaterials = lastTestScore !== null
    ? predefinedMaterials.filter(material =>
        material.recommendedFor && material.recommendedFor.includes(lastTestScore)
      )
    : []; // Якщо оцінки немає, рекомендованих матеріалів немає

  // Виключаємо рекомендовані матеріали з основного списку
  const otherMaterials = predefinedMaterials.filter(material =>
    !recommendedMaterials.includes(material)
  );

  const categories = ['Профілактика та загальна підтримка ', 'Уникнення ', 'Зміни в емоціях і мисленні', 'Повторне переживання', 'Гіперактивність', 'Інше']; // Категорії для решти матеріалів

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

      {/* Розділ "Рекомендовано" */}
      {recommendedMaterials.length > 0 && (
        <section className={styles.materialsListSection}>
          <div className={styles.categoryBlock}>
            <h2>Рекомендовано для вас</h2>
            <ul className={styles.materialList}>
              {recommendedMaterials.map((mat, index) => (
                <li key={index} className={styles.materialItem}>
                  <a href={mat.url} target="_blank" rel="noopener noreferrer">
                    {mat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Розділ "Усі матеріали" (або інші категорії, крім рекомендованих) */}
      <section className={styles.materialsListSection}>
        {/* Можна змінити заголовок або прибрати, якщо розділ "Рекомендовано" є основним */}
        <h2>Усі матеріали</h2>
        {categories.map((category) => {
          // Фільтруємо з "otherMaterials"
          const filtered = otherMaterials.filter((m) => m.category === category);
          if (filtered.length === 0) return null;

          return (
            <div key={category} className={styles.categoryBlock}>
              <h3>{category}</h3> {/* Змінено на h3 для ієрархії */}
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