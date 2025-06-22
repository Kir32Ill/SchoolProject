import React from 'react';
import styles from '../pages/GeneratePage.module.css';
import Loader from '../components/Loader';

interface GenerateButtonProps {
  isLoading: boolean;
  isDone: boolean;
  hasError: boolean;
  onGenerate: () => void;
  onRemove: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  isLoading,
  isDone,
  hasError,
  onGenerate,
  onRemove,
}) => {
  return (
    <div className={styles.buttonWrapper}>
      <button
        className={`
          ${styles.sendButton}
          ${isLoading ? styles.loading : ''}
          ${hasError ? styles.error : ''}
          ${isDone ? styles.done : ''}
        `}
        onClick={onGenerate}
        disabled={isLoading || isDone || hasError}
      >
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : isDone ? (
          'Done!'
        ) : hasError ? (
          'Ошибка'
        ) : (
          'Начать генерацию'
        )}
      </button>

      {(isDone || hasError) && (
        <button
          className={styles.removeButton}
          onClick={onRemove}
          aria-label="Удалить"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default GenerateButton;