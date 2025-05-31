import React from 'react';
import styles from './LogoutConfirmModal.module.css';
import Button from '../Button/Button';

const LogoutConfirmModal = ({ isOpen, onConfirm, onCancel, targetPath }) => {
  if (!isOpen) return null; // Якщо модальне вікно не відкрите, нічого не рендеримо

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalTitle}>Підтвердження виходу</h3>
        <p className={styles.modalMessage}>Ви дійсно хочете вийти з особистого кабінету?</p>
        <div className={styles.modalActions}>
          <Button variant="transparent" onClick={onCancel}>
            Скасувати
          </Button>
          <Button variant="blue" onClick={() => onConfirm(targetPath)}>
            Вийти
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;