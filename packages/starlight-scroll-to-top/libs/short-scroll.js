/**
 * Creates and manages the scroll-to-top button
 * @param {Object} config - Configuration options
 * @param {string} config.position - Button position ('left' or 'right')
 */
function initScrollToTop(config = {}) {
    const { position = 'right' } = config;
  
    document.addEventListener('DOMContentLoaded', () => {
      const {
        greeting = 'Hello',
        enableVitePlugin = true,
        scrollToTop: scrollToTopConfig = true, // Default to false (disabled)
      } = options ?? {};
    
      // Normalize scrollToTopConfig: treat `true` as using default options
      const scrollToTopEnabled = Boolean(scrollToTopConfig);
      const scrollToTopOptions = (typeof scrollToTopConfig === 'object' ? scrollToTopConfig : {});
      let showAfterPixels = 200; // Default scroll threshold
      const {
          position: scrollToTopPosition = 'right', // Default position      
      } = scrollToTopOptions;

      const button = document.createElement('button');
      const threshold = 200; // Pixels to scroll before showing the button
      const position = '${scrollToTopPosition}'; // Use configured value

      // --- Button Styling ---
      button.style.position = 'fixed';
      button.style.bottom = '2rem';
      button.style.padding = '0.5rem 0.8rem';
      button.style.backgroundColor = 'var(--sl-color-accent-high)'; // Use Starlight accent color
      button.style.color = 'var(--sl-color-white)';
      button.style.border = 'none';
      button.style.borderRadius = '0.5rem';
      button.style.cursor = 'pointer';
      button.style.zIndex = '100'; // Ensure it's above most content
      button.style.opacity = '0'; // Start hidden
      button.style.visibility = 'hidden';
      button.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
      button.setAttribute('aria-label', 'Scroll to top');
      button.setAttribute('title', 'Scroll to top');

      // Set left or right position based on config
      if (position === 'left') {
        button.style.left = '2rem';
      } else {
        button.style.right = '2rem'; // Default to right
      }

      // --- Button Content ---
      button.innerHTML = '&#8593;'; // Upwards arrow character

      // --- Event Listener: Show/Hide on Scroll ---
      window.addEventListener('scroll', () => {
        if (window.scrollY > threshold || document.documentElement.scrollTop > threshold) {
          button.style.opacity = '1';
          button.style.visibility = 'visible';
        } else {
          button.style.opacity = '0';
          button.style.visibility = 'hidden';
        }
      }, { passive: true }); // Use passive listener for scroll performance

      // --- Event Listener: Scroll to Top on Click ---
      button.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Smooth scrolling animation
        });
      });

      // --- Add Button to Page ---
      // Use requestAnimationFrame to ensure body is ready after DOMContentLoaded
      requestAnimationFrame(() => {
          if (document.body) {
              document.body.appendChild(button);
          } else {
              console.warn('[ScrollToTop Plugin] document.body not found.');
          }
      });
    });
  }
  
  export default initScrollToTop;