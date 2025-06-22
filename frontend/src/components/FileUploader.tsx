import React, { useState } from 'react';
import styles from './FileUploader.module.css';
import Loader from './Loader'; 

interface FileUploaderProps {
  onFileSet: (file: File | null, isValid: boolean) => void;
  isParsing?: boolean;       
  hasError?: boolean;        
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSet, isParsing = false, hasError = false }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  const processFile = (file: File) => {
    setFile(file);
    const isValidFormat = file.name.toLowerCase().endsWith('.csv');
    setIsValid(isValidFormat);
    onFileSet(file, isValidFormat);
  };

  const removeFile = () => {
    setFile(null);
    setIsValid(false);
    onFileSet(null, false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) processFile(droppedFile);
  };

  return (
    <div
      className={`
        ${styles.uploadArea}
        ${isDragging ? styles.dragging : ''}
        ${file && !hasError ? (isValid ? styles.success : styles.error) : ''}
        ${hasError ? styles.error : ''}
      `}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        id="file-input"
      />

      {!file ? (
        <>
          <button
            className={styles.uploadButton}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            Загрузить файл
          </button>
          <span className={styles.orText}>или перетащите сюда</span>
        </>
      ) : isParsing ? (
        <div className={styles.processingState}>
          <div className={styles.fileNameContainer}>
            <div className={`${styles.loader} ${isValid ? styles.valid : styles.invalid}`}>
              <Loader />
            </div>
          </div>
          <span className={styles.processingText}>идёт парсинг файла</span>
        </div>
      ) : (
        <div className={styles.fileContainer}>
          <div className={styles.fileRow}>
            <div className={`${styles.fileName} ${hasError || !isValid ? styles.invalid : styles.valid}`}>
              {file.name}
            </div>
            <button 
              className={styles.removeButton}
              onClick={removeFile}
              aria-label="Удалить файл"
            >
              &times;
            </button>
          </div>

          <div>
            {hasError ? (
              <span className={styles.errorMessage}>упс, не то...</span>
            ) : isValid ? (
              <span className={styles.successMessage}>файл загружен!</span>
            ) : (
              <span className={styles.errorMessage}>упс, не то...</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;