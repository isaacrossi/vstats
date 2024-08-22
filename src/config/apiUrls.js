export const API_BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";

export const TEAM_URL = `${API_BASE_URL}/teams?league=188&season=2024`;

export const getPlayerUrl = (searchTerm, teamId) => {
  if (searchTerm) {
    return `${API_BASE_URL}/players?league=188&season=2024&search=${searchTerm}`;
  }
  if (teamId && teamId !== "0") {
    return `${API_BASE_URL}/players?league=188&season=2024&team=${teamId}`;
  }
  return `${API_BASE_URL}/players?league=188&season=2024`;
};
