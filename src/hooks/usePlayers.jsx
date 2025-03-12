import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPlayers } from "../utils/fetchPlayers";

export const usePlayers = (selectedTeamId, submittedSearchTerm) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["players", selectedTeamId, submittedSearchTerm],
    queryFn: ({ pageParam = 1 }) =>
      fetchPlayers(pageParam, submittedSearchTerm, selectedTeamId),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPage) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  // Check if data exists and properly flatten the pages
  const players = data?.pages?.flatMap((page) => page.list) ?? [];

  console.log("Raw data from query:", data); // Add this for debugging
  console.log("Processed players:", players); // Add this for debugging

  return {
    players,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
