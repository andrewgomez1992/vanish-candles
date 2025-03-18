/**
 * Scrolls the window to the top.
 * Uses smooth scrolling if supported; falls back to an instant jump otherwise.
 */
const scrollToTop = () => {
  // Check if the browser supports the 'behavior' option in scrollTo (for smooth scrolling)
  if ("scrollBehavior" in document.documentElement.style) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  } else {
    window.scrollTo(0, 0);
  }
};

export default scrollToTop;
