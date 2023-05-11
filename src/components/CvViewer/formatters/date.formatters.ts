export const getDateFromTimeStampInDay = (timestamp?: number) => {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
};
