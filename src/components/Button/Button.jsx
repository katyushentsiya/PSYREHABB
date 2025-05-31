// components/Button/Button.jsx
// components/Button/Button.jsx
import React from 'react';
import styles from './Button.module.css';
import { Link } from 'react-router-dom'; // Додайте цей імпорт

const Button = ({ children, onClick, variant = 'blue', disabled = false, className = '', to }) => { // Додайте 'to'
  const buttonClass = `${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''} ${className}`;

  if (to) { // Якщо передано 'to' пропс, рендеримо як Link
    return (
      <Link
        to={to}
        className={buttonClass} // Застосовуємо всі стилі кнопки до Link
        onClick={onClick}
        // Для disabled Link: додаємо інлайн-стилі, щоб посилання не було клікабельним
        style={disabled ? { pointerEvents: 'none', opacity: 0.5 } : {}}
      >
        {children}
      </Link>
    );
  }

  // Якщо 'to' не передано, рендеримо як звичайну кнопку
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
