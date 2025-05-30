import React from 'react';
import styles from './Button.module.css'; 

const Button = ({ children, onClick, variant = 'blue', disabled = false }) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
