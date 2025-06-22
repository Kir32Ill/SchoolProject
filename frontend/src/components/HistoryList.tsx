import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HistoryItem from './HistoryItem';
import HistoryModal from './HistoryModal';
import styles from './HistoryList.module.css';
import type { HistoryItemData } from '../types/history';
import { useHistoryStore } from '../store/useHistoryStore'

const HistoryList: React.FC = () => {
  const { history, addHistoryItem, deleteItem, clearAll } = useHistoryStore() 
  const [selectedItem, setSelectedItem] = useState<HistoryItemData | null>(null);
  
  const navigate = useNavigate();

  const handleItemClick = (item: HistoryItemData) => {
    if (item.success && item.data) {
      setSelectedItem(item);
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteItem(id);
  };

  const handleClearAll = () => {
    clearAll(); 
  };

  return (
    <div className={styles.historyContainer}>
      {history.length === 0 && <p className={styles.title}>История пуста</p>}
      <ul className={styles.historyList}>
        {history.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            onClick={() => handleItemClick(item)}
            onDelete={() => handleDeleteItem(item.id)}
          />
        ))}
      </ul>

      <div className={styles.actions}>
        <button
          className={styles.generateMoreButton}
          onClick={() => navigate('/generate')}
        >
          Сгенерировать больше
        </button>

        <button className={styles.clearAllButton} onClick={handleClearAll}>
          Очистить всё
        </button>
      </div>

      {selectedItem && selectedItem.success && selectedItem.data && (
        <HistoryModal data={selectedItem.data} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default HistoryList;