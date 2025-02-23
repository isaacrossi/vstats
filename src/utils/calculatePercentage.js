export const calculatePercentage = (value, total) => {
  if (!value || !total) return 0;
  return Number(((value / total) * 100).toFixed(1));
};
