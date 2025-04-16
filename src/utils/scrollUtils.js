import { debounce } from "lodash";

export const monitorScrollForInfiniteFetching = (
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
) => {
  const handleScroll = debounce(() => {
    const buffer = 100;
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    const isNearBottom = innerHeight + scrollY >= scrollHeight - buffer;

    console.log(
      `scrollY: ${scrollY}, innerHeight: ${innerHeight}, scrollHeight: ${scrollHeight}, buffer: ${buffer}`,
    );
    console.log(
      `isNearBottom: ${isNearBottom}, hasNextPage: ${hasNextPage}, isFetchingNextPage: ${isFetchingNextPage}`,
    );

    if (isNearBottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, 500);

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};
