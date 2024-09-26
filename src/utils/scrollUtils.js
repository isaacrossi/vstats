import { debounce } from "lodash";

// Function to check if the user has scrolled to the bottom
export const checkScrollPosition = debounce(
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
