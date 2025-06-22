export const formatDayOfYear = (day: number | string | undefined): string => {
  if (day === undefined || day === null) return '';
  
  const dayNumber = typeof day === 'string' ? parseInt(day, 10) : day;
  
  if (isNaN(dayNumber)) return '';
  if (dayNumber < 1 || dayNumber > 365) return '';

  const date = new Date(2023, 0);
  date.setDate(dayNumber);
  
  return date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long'
  }).replace(' г.', ''); 
};