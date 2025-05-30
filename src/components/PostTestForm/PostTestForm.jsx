// src/components/PostTestForm/PostTestForm.jsx
import React, { useState } from 'react';
import styles from './PostTestForm.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom'; // <--- Додаємо useNavigate

const PostTestForm = ({ onClose }) => {
  const [selectedScore, setSelectedScore] = useState(null);
  const navigate = useNavigate(); // <--- Ініціалізуємо useNavigate

  const question = "Наскільки загалом травматична подія вплинула на ваше повсякденне життя та емоційний стан за останній час?";
  const options = [
    { label: "Зовсім не вплинула", value: 0 },
    { label: "Трохи вплинула", value: 1 },
    { label: "Помірно вплинула", value: 2 },
    { label: "Значно вплинула", value: 3 },
    { label: "Надзвичайно вплинула", value: 4 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedScore !== null) {
      // Зберігаємо відповідь на завершальне питання в localStorage
      localStorage.setItem('lastTestScore', JSON.stringify(selectedScore));
      console.log(`Вибрана оцінка збережена: ${selectedScore}`);
      // alert("Ваша відповідь збережена!"); // Можна прибрати для більш плавного UX
      onClose(); // Закриваємо форму
      navigate('/library'); // <--- Перенаправляємо на сторінку "Матеріали"
    } else {
      alert("Будь ласка, оберіть відповідь перед надсиланням.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.postTestFormContainer}>
        <div className={styles.header}>
          <h3 className={styles.title}>Завершальне питання</h3>
          {onClose && <button onClick={onClose} className={styles.closeButton}>×</button>}
        </div>

        <h4 className={styles.formQuestion}>{question}</h4>
        <form onSubmit={handleSubmit}>
          <div className={styles.optionsGroup}>
            {options.map((option) => (
              <label key={option.value} className={styles.optionLabel}>
                <input
                  type="radio"
                  name="impact"
                  value={option.value}
                  checked={selectedScore === option.value}
                  onChange={() => setSelectedScore(option.value)}
                  className={styles.radioButton}
                />
                <span className={styles.optionText}>{option.label}</span>
              </label>
            ))}
          </div>
          <Button type="submit" variant="blue" className={styles.submitButton}>
            Надіслати
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostTestForm;