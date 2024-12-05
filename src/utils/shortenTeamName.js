const shortenToTwo = (teamName) => {
  if (!teamName) return "";
  const words = teamName.split(" ");
  return words.length > 2 ? words.slice(0, 2).join(" ") : teamName;
};

const shortenToOne = (teamName) => {
  if (!teamName) return "";
  const words = teamName.split(" ");
  return words[words.length - 1];
};

export { shortenToTwo, shortenToOne };
