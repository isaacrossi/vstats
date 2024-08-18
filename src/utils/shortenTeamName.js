export const shortenTeamName = (teamName) => {
  if (!teamName) return "";
  const words = teamName.split(" ");
  return words.length > 2 ? words.slice(0, 2).join(" ") : teamName;
};
