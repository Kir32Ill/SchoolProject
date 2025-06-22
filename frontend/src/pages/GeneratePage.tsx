import React, { useState } from 'react';
import styles from './GeneratePage.module.css';
import GenerateButton from '../components/GenerateButton';

const GeneratePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setIsDone(false);
    setHasError(false);
    setErrorMessage(null);
    setDownloadProgress(0);

    try {
      const response = await fetch('http://localhost:3000/report?size=1&withErrors=off&maxSpend=1000');

      if (!response.ok) throw new Error(`Ошибка ${response.status}`);
      if (!response.body) throw new Error('Нет тела ответа');

      const reader = response.body.getReader();
      let receivedLength = 0;
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        receivedLength += value.length;
        setDownloadProgress(Math.round(receivedLength / (1024 * 1024)));
        chunks.push(value);
      }

      const fullData = new Uint8Array(receivedLength);
      let position = 0;
      for (const chunk of chunks) {
        fullData.set(chunk, position);
        position += chunk.length;
      }

      const decoder = new TextDecoder('utf-8');
      const csvText = decoder.decode(fullData);

      const blob = new Blob([csvText], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setIsDone(true);
      setHasError(false);

    } catch (error) {
      console.error('Ошибка генерации:', error);
      setHasError(true);
      setErrorMessage('Не удалось сгенерировать файл');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = () => {
    setIsDone(false);
    setHasError(false);
    setErrorMessage(null);
  };

  return (
    <div className={styles.generateContainer}>
      <p className={styles.title}>Сгенерируйте готовый csv-файл нажатием одной кнопки</p>

      <GenerateButton
        isLoading={isLoading}
        isDone={isDone}
        hasError={hasError}
        onGenerate={handleGenerate}
        onRemove={handleRemove}
      />

      {isLoading && (
        <div className={styles.process}>
          идёт процесс генерации
        </div>
      )}

      {hasError && (
        <div className={styles.errorMessage}>
          {errorMessage || 'упс, не то...'}
        </div>
      )}

      {isDone && (
        <div className={styles.generatedMessage}>
          файл сгенерирован!
        </div>
      )}
    </div>
  );
};

export default GeneratePage;