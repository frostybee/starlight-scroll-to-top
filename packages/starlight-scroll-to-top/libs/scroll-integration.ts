// src/integrations/starlight-scroll-to-top.ts
import type { AstroIntegration } from 'astro';

export default function starlightScrollToTopIntegration(): AstroIntegration {
  return {
    name: 'starlight-scroll-to-top',
    hooks: {
      'astro:config:setup': ({ injectScript }) => {
        // --- Inject CSS ---
        const css = `
          .scroll-to-top-button {
            position: fixed;
            bottom: 1.5rem; /* 24px */
            right: 1.5rem; /* 24px */
            z-index: 50; /* Ensure it's above most content */
            padding: 0.75rem; /* 12px */
            background-color: var(--sl-color-accent-low); /* Use Starlight theme variable */
            color: var(--sl-color-white);
            border: none;
            border-radius: 50%; /* Make it circular */
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            display: flex; /* Center icon */
            align-items: center;
            justify-content: center;
            width: 44px; /* Fixed size */
            height: 44px; /* Fixed size */
          }

          .scroll-to-top-button.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }

          .scroll-to-top-button:hover {
            background-color: var(--sl-color-accent); /* Darken on hover */
          }

          .scroll-to-top-button:focus {
             outline: 2px solid var(--sl-color-accent);
             outline-offset: 2px;
          }

          .scroll-to-top-button svg {
            width: 1.25em; /* 20px */
            height: 1.25em; /* 20px */
            fill: currentColor;
          }
        `;

        // Inject CSS into the head. 'head-inline' ensures it's added directly.
        injectScript('head-inline', `<style>${css}</style>`);

        // --- Inject Client-Side JavaScript ---
        const js = `
          function throttle(func, limit) {
            let lastFunc;
            let lastRan;
            return function(...args) {
              const context = this;
              if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
              } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                  if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                  }
                }, limit - (Date.now() - lastRan));
              }
            }
          }

          function setupScrollToTop() {
            const button = document.createElement('button');
            button.classList.add('scroll-to-top-button');
            button.setAttribute('aria-label', 'Scroll to top');
            // Simple inline SVG for an arrow up
            button.innerHTML = \`
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M12 4l-8 8h6v8h4v-8h6l-8-8z"/>
              </svg>
            \`;
            document.body.appendChild(button);

            const scrollThreshold = 400; // Show button after scrolling 400px

            const handleScroll = () => {
              if (window.scrollY > scrollThreshold) {
                button.classList.add('visible');
              } else {
                button.classList.remove('visible');
              }
            };

            // Throttle the scroll handler to run at most every 100ms
            const throttledHandleScroll = throttle(handleScroll, 100);

            window.addEventListener('scroll', throttledHandleScroll);

            button.addEventListener('click', () => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            });
            alert('Scroll to top button added!'); // Debug message

            // Initial check in case the page loads already scrolled down
            handleScroll();
          }

          // Run the setup function once the DOM is fully loaded
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupScrollToTop);
          } else {
            // DOMContentLoaded already fired
            setupScrollToTop();
          }
        `;

        // Inject the script. 'page' runs it on the client.
        // Using type="module" is generally good practice but not strictly needed here.
        injectScript('page', js);
      },
    },
  };
}