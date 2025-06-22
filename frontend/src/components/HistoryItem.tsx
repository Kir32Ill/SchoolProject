import React from 'react';
import styles from './HistoryItem.module.css';
import type { HistoryItemData } from '../types/history';

interface HistoryItemProps {
  item: HistoryItemData;
  onClick: () => void;
  onDelete: () => void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ item, onClick, onDelete }) => {
  const date = new Date(item.timestamp).toLocaleDateString('ru-RU');
  const isSuccess = item.success;

  return (
    <li
      className={`${styles.item} ${isSuccess ? styles.success : styles.error}`}
      onClick={isSuccess ? onClick : undefined}
      role={isSuccess ? 'button' : 'listitem'}
      aria-disabled={!isSuccess}
    >
      <div className={styles.rowContainer}>
        <img className={styles.icon} src="/docFileName.png" alt="Файл" />

        <span className={styles.fileName}>{item.fileName}</span>

        <span className={styles.date}>{date}</span>

        <div className={styles.statusIcons}>
          <img
            src={isSuccess ? '/happyActive.png' : '/happyInactive.png'}
            alt="Успешно"
            className={styles.statusIcon}
          />
          <img
            src={!isSuccess ? '/sadActive.png' : '/sadInactive.png'}
            alt="Ошибка"
            className={styles.statusIcon}
          />
        </div>
      </div>

      <div className={styles.deleteWrapper}>
        <button
          className={styles.deleteButton}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Удалить"
        >
          <img src="/bucket.png" alt="Корзина" className={styles.deleteIcon} />
        </button>
      </div>
    </li>
  );
};

export default HistoryItem;