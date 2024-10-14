export const API_BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";

// Endpoints
const API_PLAYERS = "/players";

// Parameters
const PARAM_LEAGUE = "league=188";
const PARAM_SEASON = "season=2024";
const PARAM_SEARCH = "search=";
const PARAM_TEAM = "team=";
const PARAM_PAGE = "page=";
const PARAM_PLAYER_ID = "id=";

export const getPlayersUrl = (searchTerm, teamId, page = 1) => {
  let url = `${API_BASE_URL}${API_PLAYERS}?${PARAM_LEAGUE}&${PARAM_SEASON}&${PARAM_PAGE}${page}`;

  if (searchTerm) {
    url += `&${PARAM_SEARCH}${searchTerm}`;
  } else if (teamId && teamId !== "0") {
    url += `&${PARAM_TEAM}${teamId}`;
  }

  return url;
};

export const getPlayerUrl = (id) => {
  return `${API_BASE_URL}${API_PLAYERS}?${PARAM_PLAYER_ID}${id}&${PARAM_SEASON}`;
};
