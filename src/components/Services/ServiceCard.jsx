import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OurServices.module.css';
import Button from '../Button/Button';

const ServiceCard = ({ service }) => {
  return (
    <div className={`${styles.card} ${styles.specialCard}`}>
      <div className={styles.imageContainer}>
        <img src={service.image} alt={service.title} className={styles.image} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.title}>{service.title}</h3>

        <Link to={`/services#${service.anchor}`} className={styles.detailsButton}>
          <Button variant="blue">Детальніше</Button>
        </Link>

      </div>
    </div>
  );
};

export default ServiceCard;

