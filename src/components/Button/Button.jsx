import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom'; 

const Button = ({ children, onClick, variant = 'blue', disabled = false, className = '', to }) => { // Додайте 'to'
  const buttonClass = `${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''} ${className}`;

  if (to) { // Якщо передано 'to' пропс, рендеримо як Link
    return (
      <Link
        to={to}
        className={buttonClass} 
        onClick={onClick}
        style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}
      >
        {children}
      </Link>
    );
  }

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
