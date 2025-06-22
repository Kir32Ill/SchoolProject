const API_URL = 'http://localhost:3000';

export const uploadFile = async (file: File): Promise<Response> => {
  const formData = new FormData();
  formData.append('file', file);
  return fetch(`${API_URL}/aggregate`, {
    method: 'POST',
    body: formData,
  });
};

export const generateTestCSV = async (): Promise<string> => {
  const response = await fetch(`${API_URL}/report?size=1&withErrors=off&maxSpend=1000`);
  if (!response.ok) throw new Error('Ошибка генерации файла');

  const text = await response.text();
  return text;
};