import { debounce } from "lodash";

export const monitorScrollForInfiniteFetching = (
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
) => {
  const handleScroll = debounce(() => {
    const buffer = 100;
    const isNearBottom =
      window.scrollY >= document.documentElement.scrollHeight - buffer;

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, 500);

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};
