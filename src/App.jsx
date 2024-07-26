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
        <header className="h-1/2 pt-28 pb-14 bg-blue-diagonal bg-cover bg-no-repeat">
          <h1 className="mb-12 font-heading text-4xl text-slate-50 uppercase">
            Players
          </h1>

          <div className="flex flex-col">
            <form className="mb-6">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search for a player"
              />
            </form>

            <form>
              <label htmlFor="teams" className="sr-only">
                Teams
              </label>
              <select name="teams" id="teams">
                <option value="all teams">All Teams</option>
                <option value="wanderers">Wanderers</option>
              </select>
            </form>
          </div>
        </header>

        <hr />
      </div>
    </div>
  );
}

export default App;
