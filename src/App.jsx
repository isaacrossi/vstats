import { BrowserRouter, Routes, Route } from "react-router-dom";

import PlayerDetails from "./pages/PlayerDetails/index";
import Players from "./pages/Players/index";

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
