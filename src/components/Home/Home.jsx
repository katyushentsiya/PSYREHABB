import React from 'react';
import Button from '../Button/Button';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div id="main-block-section" className={styles.container}>
      <section className={styles.mainBlock} id="main-block-section">
        <h2>Психологічна підтримка: твій безпечний простір</h2>
        <p>Отримай інструменти для подолання труднощів. Індивідуальні консультації та ресурси для саморозвитку</p>
        <Link to="/register" className={styles.requestButtonLink}> {/* Обертаємо Button в Link */}
          <Button variant="blue">
            Запит
          </Button>
        </Link>
      </section>
      <div className={styles.backgroundImage} />
    </div>
  );
};

export default Home;