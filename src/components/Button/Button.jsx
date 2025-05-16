import React from 'react';
import styles from './Button.module.css'; 

const Button = ({ children, onClick, variant = 'blue' }) => {
  const buttonClass = `${styles.button} ${styles[variant]}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;