// scroll-to-top.js - Client-side script for the scroll-to-top functionality

/**
 * Creates and manages the scroll-to-top button
 * @param {Object} config - Configuration options
 * @param {string} config.position - Button position ('left' or 'right')
 * @param {string} config.tooltipText - Text to show in the tooltip
 */
function initScrollToTop(config = {}) {
    const { 
      position = 'right',
      tooltipText = 'Scroll to top'
    } = config;
  
    document.addEventListener('DOMContentLoaded', () => {
      // Create the button element
      const scrollToTopButton = document.createElement('button');
      scrollToTopButton.id = 'scroll-to-top-button';
      scrollToTopButton.ariaLabel = tooltipText;
      scrollToTopButton.title = tooltipText;
      
      // Add button styles
      scrollToTopButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      `;
      
      // Create tooltip element
      const tooltip = document.createElement('div');
      tooltip.id = 'scroll-to-top-tooltip';
      tooltip.textContent = tooltipText;
      
      // Apply tooltip styles with position based on config
      tooltip.style.cssText = `
        position: absolute;
        ${position === 'left' ? 'left: 60px;' : 'right: 60px;'}
        bottom: 12px;
        background-color: var(--sl-color-gray-5);
        color: var(--sl-color-text);
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 14px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s, visibility 0.2s;
        pointer-events: none;
      `;
      
      // Apply CSS styles with position based on config
      scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        ${position === 'left' ? 'left: 20px;' : 'right: 20px;'}
        width: 50px;
        height: 50px;
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
      
      // Add tooltip to the button's container
      scrollToTopButton.appendChild(tooltip);
      
      // Add tooltip display on hover
      scrollToTopButton.addEventListener('mouseenter', () => {
        scrollToTopButton.style.backgroundColor = 'var(--sl-color-accent-high)';
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
      });
      
      scrollToTopButton.addEventListener('mouseleave', () => {
        scrollToTopButton.style.backgroundColor = 'var(--sl-color-accent)';
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
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
        // Show the button when page is scrolled down 30% of viewport height
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const pageHeight = document.documentElement.scrollHeight;
        
        // Calculate how far down the page the user has scrolled
        const scrollPercentage = scrollPosition / (pageHeight - viewportHeight);
        
        if (scrollPercentage > 0.3) { // Show when scrolled past 30%
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
          tooltip.style.backgroundColor = 'var(--sl-color-gray-6)';
        } else {
          scrollToTopButton.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
          tooltip.style.backgroundColor = 'var(--sl-color-gray-5)';
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