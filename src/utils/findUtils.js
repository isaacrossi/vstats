// find object that contains A-League stats and has played at least one game
const findALeagueAndPlayed = (data) =>
  data?.statistics.find(
    (stat) => stat.league?.name === "A-League" && stat.games.appearences > 0
  );

// find object that contains A-League stats
const findALeague = (data) =>
  data?.statistics.find((stat) => stat.league?.name === "A-League");

export { findALeagueAndPlayed, findALeague };
