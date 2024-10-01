import { debounce } from "lodash";

// Function to check if the user has scrolled to the bottom
const checkScrollPosition = debounce(
  (callback, list, setHasReachedBottom, hasReachedBottom) => {
    const buffer = 100; // Buffer to trigger early
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const isScrollNearEnd = viewportHeight + scrollY + buffer >= documentHeight;

    if (isScrollNearEnd && !list.isLoading && !hasReachedBottom) {
      console.log("Reached bottom, fetching more players...");
      setHasReachedBottom(true); // Prevent further fetches
      callback();
    }
  },
  500
);

export const monitorScrollForInfiniteFetching = (
  callback,
  list,
  setHasReachedBottom,
  hasReachedBottom
) => {
  const scrollListener = () => {
    checkScrollPosition(callback, list, setHasReachedBottom, hasReachedBottom);
  };
  window.addEventListener("scroll", scrollListener);

  return () => {
    window.removeEventListener("scroll", scrollListener);
  };
};
