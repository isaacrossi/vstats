import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PlayerDetails from "./pages/PlayerDetails/index";
import Players from "./pages/Players/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/details/:id" element={<PlayerDetails />} />
          <Route path="/" element={<Players />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
