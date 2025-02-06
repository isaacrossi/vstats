export const formatNumber = (rating) => {
  if (!rating) return "0";
  return Number(rating).toFixed(2);
};
