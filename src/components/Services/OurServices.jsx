import React from 'react';
import ServiceCard from '../Services/ServiceCard';
import styles from './OurServices.module.css';

const OurServices = () => {
  const servicesData = [
    {
      id: 1,
      title: 'Система оцінки психологічного стану користувачів',
      image: '/PSYREHABB/test.png', 
      anchor: 'assessment',
    },
    {
      id: 2,
      title: 'Бібліотека інформаційних ресурсів',
      image: '/PSYREHABB/educ.png', 
      anchor: 'library',
    },
    {
      id: 3,
      title: 'Платформа для обміну досвідом',
      image: '/PSYREHABB/forum.png', 
      anchor: 'community',
    },
    {
      id: 4,
      title: 'Інструмент для ведення особистих записів',
      image: '/PSYREHABB/emo.png', 
      anchor: 'emotion',
    },
  ];

  return (
    <section id="services-section" className={styles.servicesSection}>
      <div className={styles.container}>
        <h2>Наші послуги</h2>
        <div className={styles.servicesGrid}>
          {servicesData.map(service => (
            <ServiceCard
              key={service.id}
              service={service}
              className={styles.specialCard} // Застосовуємо клас specialCard до всіх карток
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;