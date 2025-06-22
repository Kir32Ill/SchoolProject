import React from 'react';
import styles from './ResultTable.module.css';
import type { AnalyticsData } from '../types/analyticsData';
import { formatDayOfYear } from '../utils/dateUtils'

interface ResultProps {
  data: AnalyticsData;
}

const ResultTable: React.FC<ResultProps> = ({ data, isModal = false }) => {

  const bigSpentAt = formatDayOfYear(data.big_spent_at ?? data.big_spent_day);
  const lessSpentAt = formatDayOfYear(data.less_spent_at ?? data.less_spent_day);

  return (
    <div className={`${styles.resultTable} ${isModal ? styles.modalVersion : ''}`}>
      {!isModal}
      <div className={styles.twoColumnLayout}>
        <div className={styles.column}>
          <div className={styles.card}>
            <div className={styles.value}>{data.total_spend_galactic.toFixed(0)}</div>
            <div className={styles.label}>общие расходы в галактических кредитах</div>
          </div>

          <div className={styles.card}>
            <div className={styles.value}>{data.rows_affected}</div>
            <div className={styles.label}>количество обработанных записей</div>
          </div>

          <div className={styles.card}>
            <div className={styles.value}>{lessSpentAt}</div>
            <div className={styles.label}>день года с минимальными расходами</div>
          </div>
          
          <div className={styles.card}>
            <div className={styles.value}>{data.big_spent_civ}</div>
            <div className={styles.label}>цивилизация с максимальными расходами</div>
          </div>
        </div>

        <div className={styles.column}>
          <div className={styles.card}>
            <div className={styles.value}>{data.less_spent_civ}</div>
            <div className={styles.label}>цивилизация с минимальными расходами</div>
          </div>
        
          <div className={styles.card}>
            <div className={styles.value}>{bigSpentAt}</div>
            <div className={styles.label}>день года с максимальными расходами</div>
          </div>

          <div className={styles.card}>
            <div className={styles.value}>{data.big_spent_value}</div>
            <div className={styles.label}>максимальная сумма расходов за день</div>
          </div>

          <div className={styles.card}>
            <div className={styles.value}>{data.average_spend_galactic.toFixed(0)}</div>
            <div className={styles.label}>средние расходы в галактических кредитах</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultTable;