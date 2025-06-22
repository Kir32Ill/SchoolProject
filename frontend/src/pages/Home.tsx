import React, { useState } from 'react';
import FileUploader from '../components/FileUploader';
import ResultTable from '../components/ResultTable';
import styles from './Home.module.css';
import type { AnalyticsData } from '../types/analyticsData';
import { useHistoryStore } from '../store/useHistoryStore';

const Home: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isValidFormat, setIsValidFormat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [resultData, setResultData] = useState<AnalyticsData | null>(null);

  const { addHistoryItem } = useHistoryStore();

  const handleFileSet = (file: File | null, isValid: boolean) => {
    setFile(file);
    setIsValidFormat(isValid);
    setUploadError(null);
    setResultData(null);
  };

  const handleSendClick = async () => {
    if (!file || !isValidFormat || isLoading) return;

    setIsParsing(true);
    setIsLoading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const url = new URL('http://localhost:3000/aggregate');
      url.searchParams.set('rows', '10000');

      const response = await fetch(url.toString(), {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error(`Ошибка ${response.status}`);

      const reader = response.body?.getReader();
      let partial = '';
      let finalResult: AnalyticsData | null = null;

      while (true) {
        const { done, value } = await reader?.read() || {};
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        partial += chunk;

        const lines = partial.split('\n');
        partial = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const data: AnalyticsData = JSON.parse(line);
            if (data.rows_affected !== undefined && data.total_spend_galactic !== undefined) {
              setResultData(data);
              finalResult = data;
            }
          } catch (e) {
            console.warn('Невалидная строка:', line + e);
          }
        }
      }

      if (finalResult) {
        addHistoryItem({
          fileName: file.name,
          timestamp: Date.now(),
          success: true,
          data: finalResult,
        });
      }

    } catch (error) {
      console.error('Ошибка загрузки:', error);

      addHistoryItem({
        fileName: file.name,
        timestamp: Date.now(),
        success: false,
        error: 'Не удалось проанализировать файл',
      });

      setUploadError('Не удалось проанализировать файл');

    } finally {
      setIsLoading(false);
      setIsParsing(false);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <p className={styles.title}>
        Загрузите <b>csv</b> файл и получите <b>полную информацию</b> о нём за сверхъестественное время
      </p>

      <FileUploader onFileSet={handleFileSet} isParsing={isParsing} hasError={!!uploadError} />

      {!resultData && !isParsing && (
        <div className={styles.sendButtonWrapper}>
          <button
            className={`${styles.sendButton} ${isValidFormat ? styles.active : ''}`}
            onClick={handleSendClick}
            disabled={!file || !isValidFormat || isLoading}
          >
            {'Отправить'}
          </button>
        </div>
      )}

      <div className={styles.resultsSection}>
        {isParsing && !resultData && (
          <div className={styles.loadingIndicator}></div>
        )}
        {resultData && <ResultTable data={resultData} />}
        {!resultData && !isParsing && (
          <div className={styles.highlightsPlaceholder}>
            <div className={styles.placeholderLine}>Здесь</div>
            <div className={styles.placeholderLine}>появятся хайлайты</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;