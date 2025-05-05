// scroll-to-top.js - Client-side script for the scroll-to-top functionality

/**
 * Creates and manages the scroll-to-top button
 * @param {Object} config - Configuration options
 * @param {string} config.position - Button position relative to the bottom corner of the page ('left' or 'right')
 * @param {string} config.tooltipText - Text to show in the tooltip
 * @param {boolean} config.smooth - Whether to use smooth scrolling
 * @param {number} config.threshold - Height after page scroll to be visible (percentage)
 * @param {string} config.svgPath - The SVG icon path d attribute
 * @param {number} config.borderRadius - The radius of the button corners, 50 for circle.
 * @param {boolean} config.showTooltip - Whether to show the tooltip on hover
 * @param {boolean} config.svgStrokeWidth - The SVG icon stroke width
 */
function initScrollToTop(config = {}) {
  const {
    position = "right",
    tooltipText = "Scroll to top",
    smooth = false,
    threshold = 30, // Default: show when scrolled 30% down
    svgPath = "M18 15l-6-6-6 6",
    svgStrokeWidth = "2",
    borderRadius = "15",
    showTooltip = false,
  } = config;

  document.addEventListener("DOMContentLoaded", () => {
    // Create the button element
    const scrollToTopButton = document.createElement("button");
    scrollToTopButton.id = "scroll-to-top-button";
    scrollToTopButton.ariaLabel = tooltipText;
    scrollToTopButton.title = tooltipText;

    // Add button with configurable SVG icon
    scrollToTopButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" 
           width="35" 
           height="35" 
           viewBox="0 0 24 24"            
           fill="none" 
           stroke="currentColor" 
           stroke-width="${svgStrokeWidth}" 
           stroke-linecap="round" 
           stroke-linejoin="round">
        <path d="${svgPath}"/>
      </svg>
    `;

    // Create tooltip element
    const tooltip = document.createElement("div");
    tooltip.id = "scroll-to-top-tooltip";
    tooltip.textContent = tooltipText;

    // Apply tooltip styles with position based on config
    tooltip.style.cssText = `
    position: absolute;
    ${position === "left" ? "left: -25px;" : "right: -22px;"}
    top: -47px;
    background-color: var(--sl-color-gray-5);
    color: var(--sl-color-text);
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.3s;
    pointer-events: none;
  `;

    // Create the arrow element
    const arrow = document.createElement("div");
    arrow.style.cssText = `
    position: absolute;
    top: 100%; /* Position below the tooltip */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--sl-color-gray-5);
  `;

    //TODO: test fill color with text color.
    // Use fill color if specified, otherwise use starlight color.
    // Apply CSS styles with position based on config
    scrollToTopButton.style.cssText = `
      position: fixed;
      bottom: 35px;
      width: 43px;
      height: 43px;
      ${position === "left" ? "left: 40px;" : "right: 35px;"}      
      border-radius: ${borderRadius}%;
      background-color: var(--sl-color-accent);
      color: white;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.5s, visibility 0.6s;
      z-index: 100;            
      box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
    `;

    // Add the button to the body
    document.body.appendChild(scrollToTopButton);

    // Add tooltip to the button's container
    if (showTooltip) {
      tooltip.appendChild(arrow);
      scrollToTopButton.appendChild(tooltip);
    }

    // Add tooltip display on hover
    scrollToTopButton.addEventListener("mouseenter", () => {
      scrollToTopButton.style.backgroundColor = "var(--sl-color-accent-high)";
      // scrollToTopButton.style.color = "var(--sl-color-text-invert)";
      scrollToTopButton.style.transition = "background-color 0.3s ease-in-out";
      tooltip.style.opacity = "1";
      tooltip.style.visibility = "visible";
    });

    scrollToTopButton.addEventListener("mouseleave", () => {
      scrollToTopButton.style.backgroundColor = "var(--sl-color-accent)";
      tooltip.style.opacity = "0";
      tooltip.style.visibility = "hidden";
    });

    scrollToTopButton.addEventListener("focus", () => {
      scrollToTopButton.style.outline = "none";
    });

    // Add click event to scroll to top with smooth scrolling option
    scrollToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: smooth ? "smooth" : "auto",
      });
    });

    // Show/hide the button based on scroll position
    const toggleScrollToTopButton = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      // Calculate how far down the page the user has scrolled
      const scrollPercentage = scrollPosition / (pageHeight - viewportHeight);

      // Ensure threshold is between 0 and 99
      const thresholdValue =
        threshold > 0 && threshold >= 10 && threshold <= 99 ? threshold : 30;

      if (scrollPercentage > thresholdValue / 100) {
        // Show when scrolled past configured threshold
        scrollToTopButton.style.opacity = "1";
        scrollToTopButton.style.visibility = "visible";
      } else {
        scrollToTopButton.style.opacity = "0";
        scrollToTopButton.style.visibility = "hidden";
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", toggleScrollToTopButton);

    // Initial check on page load
    toggleScrollToTopButton();

    // Handle theme changes by applying appropriate styles
    const updateThemeStyles = () => {
      const isDarkTheme =
        document.documentElement.classList.contains("theme-dark");
      if (isDarkTheme) {
        // scrollToTopButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.4)";
        tooltip.style.backgroundColor = "var(--sl-color-gray-6)";
      } else {
        // scrollToTopButton.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
        tooltip.style.backgroundColor = "var(--sl-color-gray-5)";
      }
    };

    // Initial theme check
    updateThemeStyles();

    // Monitor theme changes
    const observer = new MutationObserver(updateThemeStyles);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Function to check zoom level and hide the button accordingly
    function checkZoomLevel() {
      const zoomLevel = window.devicePixelRatio; // This gives an approximation of the zoom level

      // If zoom level is above a certain threshold (e.g., 1.5), hide the button
      if (zoomLevel > 3) {
        scrollToTopButton.style.display = "none"; // Hide button if zoom is above 300%
      } else {
        scrollToTopButton.style.display = "flex";
      }
    }

    // Run the check whenever the window is resized or zoomed
    window.addEventListener("resize", checkZoomLevel);

    // Also run it on initial load to account for the page's zoom state
    checkZoomLevel();

    // Cleanup function to remove event listeners when navigating between pages
    return () => {
      window.removeEventListener("scroll", toggleScrollToTopButton);
      observer.disconnect();
      if (scrollToTopButton.parentNode) {
        scrollToTopButton.parentNode.removeChild(scrollToTopButton);
      }
    };
  });
}

export default initScrollToTop;
