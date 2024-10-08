const playerOne = {
  player: {
    id: 444108,
    name: "J. Bidois",
    firstname: "Jonty",
    lastname: "Bidois",
    age: 20,
    birth: {
      date: "2004-11-05",
      place: null,
      country: "New Zealand",
    },
    nationality: "New Zealand",
    height: null,
    weight: null,
    injured: false,
    photo: "https://media.api-sports.io/football/players/444108.png",
  },
  statistics: [
    {
      team: {
        id: 24608,
        name: "Auckland",
        logo: "https://media.api-sports.io/football/teams/24608.png",
      },
      league: {
        id: 188,
        name: "A-League",
        country: "Australia",
        logo: "https://media.api-sports.io/football/leagues/188.png",
        flag: "https://media.api-sports.io/flags/au.svg",
      },
      games: {
        appearences: null,
        lineups: null,
        minutes: null,
        number: null,
        position: "Attacker",
        rating: null,
        captain: null,
      },
      substitutes: {
        in: null,
        out: null,
        bench: null,
      },
      shots: {
        total: null,
        on: null,
      },
      goals: {
        total: null,
        conceded: null,
        assists: null,
        saves: null,
      },
      passes: {
        total: null,
        key: null,
        accuracy: null,
      },
      tackles: {
        total: null,
        blocks: null,
        interceptions: null,
      },
      duels: {
        total: null,
        won: null,
      },
      dribbles: {
        attempts: null,
        success: null,
        past: null,
      },
      fouls: {
        drawn: null,
        committed: null,
      },
      cards: {
        yellow: null,
        yellowred: null,
        red: null,
      },
      penalty: {
        won: null,
        commited: null,
        scored: null,
        missed: null,
        saved: null,
      },
    },
  ],
};

const playerTwo = {
  player: {
    id: 444109,
    name: "A. Smith",
    firstname: "Alex",
    lastname: "Smith",
    age: 22,
    birth: {
      date: "2002-08-15",
      place: "Sydney",
      country: "Australia",
    },
    nationality: "Australia",
    height: "180 cm",
    weight: "75 kg",
    injured: false,
    photo: "https://media.api-sports.io/football/players/444109.png",
  },
  statistics: [
    {
      team: {
        id: 24609,
        name: "Sydney FC",
        logo: "https://media.api-sports.io/football/teams/24609.png",
      },
      league: {
        id: 188,
        name: "A-League",
        country: "Australia",
        logo: "https://media.api-sports.io/football/leagues/188.png",
        flag: "https://media.api-sports.io/flags/au.svg",
      },
      games: {
        appearences: 10,
        lineups: 8,
        minutes: 720,
        number: 10,
        position: "Midfielder",
        rating: "7.5",
        captain: false,
      },
      substitutes: {
        in: 2,
        out: 5,
        bench: 3,
      },
      shots: {
        total: 15,
        on: 8,
      },
      goals: {
        total: 3,
        conceded: 0,
        assists: 2,
        saves: 0,
      },
      passes: {
        total: 300,
        key: 20,
        accuracy: "85%",
      },
      tackles: {
        total: 20,
        blocks: 5,
        interceptions: 10,
      },
      duels: {
        total: 50,
        won: 30,
      },
      dribbles: {
        attempts: 25,
        success: 15,
        past: 5,
      },
      fouls: {
        drawn: 10,
        committed: 5,
      },
      cards: {
        yellow: 1,
        yellowred: 0,
        red: 0,
      },
      penalty: {
        won: 1,
        commited: 0,
        scored: 1,
        missed: 0,
        saved: 0,
      },
    },
  ],
};

export const anotherPlayer = {
  player: {
    id: 444110,
    name: "G. Colli",
    firstname: "Giovanni",
    lastname: "Colli",
    age: 25,
    birth: {
      date: "1996-05-15",
      place: "Rome",
      country: "Italy",
    },
    nationality: "Italy",
    height: "175 cm",
    weight: "70 kg",
    injured: false,
    photo: "https://media.api-sports.io/football/players/444110.png",
  },
  statistics: [
    {
      team: {
        id: 24610,
        name: "Roma",
        logo: "https://media.api-sports.io/football/teams/24610.png",
      },
      league: {
        id: 188,
        name: "Serie A",
        country: "Italy",
        logo: "https://media.api-sports.io/football/leagues/188.png",
        flag: "https://media.api-sports.io/flags/it.svg",
      },
      games: {
        appearences: 15,
        lineups: 10,
        minutes: 900,
        number: 8,
        position: "Midfielder",
        rating: "7.8",
        captain: false,
      },
      substitutes: {
        in: 5,
        out: 3,
        bench: 2,
      },
      shots: {
        total: 20,
        on: 10,
      },
      goals: {
        total: 5,
        conceded: 0,
        assists: 3,
        saves: 0,
      },
      passes: {
        total: 400,
        key: 30,
        accuracy: "90%",
      },
      tackles: {
        total: 25,
        blocks: 5,
        interceptions: 15,
      },
      duels: {
        total: 60,
        won: 40,
      },
      dribbles: {
        attempts: 30,
        success: 20,
        past: 10,
      },
      fouls: {
        drawn: 15,
        committed: 10,
      },
      cards: {
        yellow: 2,
        yellowred: 0,
        red: 0,
      },
      penalty: {
        won: 2,
        commited: 0,
        scored: 2,
        missed: 0,
        saved: 0,
      },
    },
  ],
};

export const players = {
  response: [playerOne, playerTwo], // Wrap players in a response array
  paging: {
    current: 1, // Current page number
    total: 1, // Total number of pages (for example, you can set this dynamically)
  },
};
