const players = [
  {
    name: "Jack Clisby",
    team: "Western Sydney Wanderers",
    country: "Australia",
    role: "defender",
  },
  {
    name: "Keanu Baccus",
    team: "Western Sydney Wanderers",
    country: "Australia",
    role: "midfielder",
  },
];

function App() {
  return (
    <div className="bg-blue-1000">
      <div className="container mx-auto">
        <header className="pt-24 pb-14">
          <h1 className="mb-12 font-heading text-4xl text-slate-50 uppercase">
            Players
          </h1>

          <label htmlFor="search" />
          <input id="search" type="text" placeholder="Search for a player" />
        </header>

        <hr />
      </div>
    </div>
  );
}

export default App;
