import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlayerDetails from "./pages/PlayerDetails/PlayerDetails";
import Players from "./pages/Players/Players";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/details/:id" element={<PlayerDetails />} />
        <Route path="/" element={<Players />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
