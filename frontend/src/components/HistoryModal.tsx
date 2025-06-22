import React from 'react';
import styles from './HistoryModal.module.css';
import type { AnalyticsData } from '../types/analyticsData';
import { formatDayOfYear } from '../utils/dateUtils'

interface HistoryModalProps {
  data?: AnalyticsData;
  error?: string;
  onClose: () => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ data, error, onClose }) => {
  const formatDay = (day: number | string | undefined): string => {
    if (day === undefined) return '';
    if (typeof day === 'string') return day;
    return day.toString();
  };

  const bigSpentAt = formatDayOfYear(data.big_spent_at ?? data.big_spent_day);
  const lessSpentAt = formatDayOfYear(data.less_spent_at ?? data.less_spent_day);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>

      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.modalContentInner}>
          {error ? (
            <div className={styles.errorContainer}>
              <h2 className={styles.errorTitle}>Ошибка анализа</h2>
              <p className={styles.errorMessage}>{error}</p>
            </div>
          ) : data ? (
            <div className={styles.resultContainer}>
              <div className={styles.resultList}>
                <div className={styles.resultCard}>
                  <div className={styles.resultValue}>{data.total_spend_galactic}</div>
                  <div className={styles.resultLabel}>общие расходы в галактических кредитах</div>
                </div>
                
                <div className={styles.resultCard}>
                  <div className={styles.resultValue}>{data.rows_affected}</div>
                  <div className={styles.resultLabel}>количество обработанных записей</div>
                </div>
                
                <div className={styles.resultCard}>
                  <div className={styles.resultValue}>{lessSpentAt}</div>
                  <div className={styles.resultLabel}>день года с минимальными расходами</div>
                </div>
                
                <div className={styles.resultCard}>
                  <div className={styles.resultValue}>{data.big_spent_civ}</div>
                  <div className={styles.resultLabel}>цивилизация с максимальными расходами</div>
                </div>
                
                <div className={styles.resultCard}>
                  <div className={styles.resultValue}>{data.less_spent_civ}</div>
                  <div className={styles.resultLabel}>цивилизация с минимальными расходами</div>
                </div>
                
                <div className={styles.resultCard}>
                  <div className={styles.resultValue}>{bigSpentAt}</div>
                  <div className={styles.resultLabel}>день года с максимальными расходами</div>
                </div>
                
                <div className={styles.resultCard}>
                  <div className={styles.resultValue}>{data.big_spent_value}</div>
                  <div className={styles.resultLabel}>максимальная сумма расходов за день</div>
                </div>
                
                <div className={styles.resultCard}>
                  <div className={styles.resultValue}>{data.average_spend_galactic.toFixed(0)}</div>
                  <div className={styles.resultLabel}>средние расходы в галактических кредитах</div>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.errorContainer}>
              <h2 className={styles.errorTitle}>Данные отсутствуют</h2>
              <p className={styles.errorMessage}>Не удалось загрузить результаты анализа</p>
            </div>
          )}
        </div>
      </div>

      <button 
            className={styles.closeButton} 
            onClick={onClose}
        >
            &times;
        </button>
    </div>
  );
};

export default HistoryModal;