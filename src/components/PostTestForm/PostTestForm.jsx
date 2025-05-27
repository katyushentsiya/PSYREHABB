import React, { useState } from 'react';
import styles from './PostTestForm.module.css';
import Button from '../Button/Button';

const PostTestForm = ({ onClose }) => { // Прибираємо onFormSubmit, бо кнопка не працює
  const [selectedScore, setSelectedScore] = useState(null);

  const question = "Наскільки загалом травматична подія вплинула на ваше повсякденне життя та емоційний стан за останній місяць?";
  const options = [
    { label: "Зовсім не вплинула", value: 0 },
    { label: "Трохи вплинула", value: 1 },
    { label: "Помірно вплинула", value: 2 },
    { label: "Значно вплинула", value: 3 },
    { label: "Надзвичайно вплинула", value: 4 },
  ];

  // Функція handleSubmit більше не викликає onFormSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    // Наразі нічого не робимо при натисканні кнопки, оскільки вона "не працююча"
    console.log("Кнопка 'Надіслати' натиснута, але функціонал надсилання поки вимкнено.");
    // Можна залишити alert, якщо хочете підтвердження натискання
    // alert("Наразі функціонал надсилання відповіді відключено.");
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.postTestFormContainer}>
        <div className={styles.header}>
          <h3 className={styles.title}>Завершальне питання</h3>
          {onClose && <button onClick={onClose} className={styles.closeButton}>&times;</button>}
        </div>

        <h4 className={styles.formQuestion}>{question}</h4>
        <form onSubmit={handleSubmit}> {/* onSubmit все ще викликає handleSubmit */}
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
          {/* Кнопка все ще тип="submit", але handleSubmit нічого не робить */}
          <Button type="submit" variant="blue" className={styles.submitButton}>
            Надіслати
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PostTestForm;