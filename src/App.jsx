import { BrowserRouter, Routes, Route } from "react-router-dom";

import Players from "./Players";
import PlayerDetails from "./PlayerDetails";

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
