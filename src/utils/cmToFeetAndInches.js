export const cmToFeetAndInches = (height) => {
  const cm = parseInt(height.split("cm")[0], 10);
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}ft ${inches}in`;
};
