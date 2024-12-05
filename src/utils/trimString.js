export const trimString = (str, length = 3) => {
  const specialCases = {
    goalkeeper: "gk",
  };

  if (specialCases[str.toLowerCase()]) {
    return specialCases[str.toLowerCase()];
  }

  return str.substring(0, length);
};
