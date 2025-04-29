/**
 * Creates and manages the scroll-to-top button
 * @param {Object} config - Configuration options
 * @param {string} config.position - Button position ('left' or 'right')
 */
function initScrollToTop(config = {}) {
    const { position = 'right' } = config;
  
    document.addEventListener('DOMContentLoaded', () => {
      // Create the button element
      const scrollToTopButton = document.createElement('button');
      scrollToTopButton.id = 'scroll-to-top-button';
      scrollToTopButton.ariaLabel = 'Scroll to top';
      scrollToTopButton.title = 'Scroll to top';
      
      // Add button styles
      scrollToTopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      `;
      
      // Apply CSS styles with position based on config
      scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        ${position === 'left' ? 'left: 20px;' : 'right: 20px;'}
        width: 43px;
        height: 43px;        
        border-radius: 50%;
        background-color: var(--sl-color-accent);
        color: var(--sl-color-white);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
        z-index: 100;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      `;
      
      // Add the button to the body
      document.body.appendChild(scrollToTopButton);
      
      // Add hover effect with event listeners
      scrollToTopButton.addEventListener('mouseenter', () => {
        scrollToTopButton.style.backgroundColor = 'var(--sl-color-accent-high)';
      });
      
      scrollToTopButton.addEventListener('mouseleave', () => {
        scrollToTopButton.style.backgroundColor = 'var(--sl-color-accent)';
      });
      
      // Add click event to scroll to top
      scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
      
      // Show/hide the button based on scroll position
      const toggleScrollToTopButton = () => {
        //TODO: Add a check for the page height to avoid showing the button on very short pages
        //TODO: add an option to let the user choose the scroll percentage to show the button.
        // Show the button when page is scrolled down 30% of viewport height
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        
        // Calculate how far down the page the user has scrolled
        const scrollPercentage = scrollPosition / (pageHeight - viewportHeight);
        
        // Show when scrolled past 30%
        //TODO: add the scroll threshold to the config options
        if (scrollPercentage > 0.3) { 
          scrollToTopButton.style.opacity = '1';
          scrollToTopButton.style.visibility = 'visible';
        } else {
          scrollToTopButton.style.opacity = '0';
          scrollToTopButton.style.visibility = 'hidden';
        }
      };
      
      // Add scroll event listener
      window.addEventListener('scroll', toggleScrollToTopButton);
      
      // Initial check on page load
      toggleScrollToTopButton();
      
      // Handle theme changes by applying appropriate styles
      const updateThemeStyles = () => {
        const isDarkTheme = document.documentElement.classList.contains('theme-dark');
        if (isDarkTheme) {
          scrollToTopButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.4)';
        } else {
          scrollToTopButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        }
      };
      
      // Initial theme check
      updateThemeStyles();
      
      // Monitor theme changes
      const observer = new MutationObserver(updateThemeStyles);
      observer.observe(document.documentElement, { 
        attributes: true, 
        attributeFilter: ['class'] 
      });
  
      // Cleanup function to remove event listeners when navigating between pages
      return () => {
        window.removeEventListener('scroll', toggleScrollToTopButton);
        observer.disconnect();
        if (scrollToTopButton.parentNode) {
          scrollToTopButton.parentNode.removeChild(scrollToTopButton);
        }
      };
    });
  }
  
  export default initScrollToTop;