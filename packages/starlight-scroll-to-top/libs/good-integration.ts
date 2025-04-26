import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { readFile, readFileSync } from 'node:fs';

// Get directory path of current file
const __dirname = dirname(fileURLToPath(import.meta.url));

// Define configuration options type
export interface ScrollToTopOptions {
  /**
   * Position of the scroll to top button
   * @default 'right'
   */
  position?: 'left' | 'right';
}

export default function starlightScrollToTopIntegration(options: ScrollToTopOptions = {}): AstroIntegration {
  // Set default options
  const config = {
    position: 'right',
    ...options
  };

  return {
    name: 'starlight-scroll-to-top',
    hooks: {
      'astro:config:setup': ({ injectScript, logger }) => {   
        //const fileContent = readFile(join(__dirname, 'scroll-to-top.js'), 'utf-8');     
        const fileContent = readFileSync(join(__dirname, 'scroll-to-top.js'), 'utf-8'); // Synchronously read the file content
        // Inject client-side script that will handle scroll behavior        
        logger.info('Injecting scroll to top script...');
        logger.info(fileContent);

        // Pass the configuration as stringified JSON
        injectScript('page', `
            ${fileContent};
            initScrollToTop(${JSON.stringify(config)});
          `);
      },
      'astro:build:setup': ({ vite }) => {
        // Define virtual module for the scroll functionality
        vite.plugins = vite.plugins || [];
        vite.plugins.push({
          name: 'virtual:starlight-scroll-to-top',
          resolveId(id) {
            if (id === 'virtual:starlight/scroll-to-top') {
              return id;
            }
          },
          async load(id) {
            if (id === 'virtual:starlight/scroll-to-top') {
              // Load the client-side script
              return await readFile(join(__dirname, 'scroll-to-top.js'), 'utf-8');
            }
          }
        });
      },
      'astro:build:done': ({ dir, logger }) => {
        logger.info(`Starlight Scroll To Top plugin has been installed successfully! Button position: ${config.position}`);
      }
    }
  };
}

// Example usage for readme:
// ```js
// // astro.config.mjs
// import { defineConfig } from 'astro/config';
// import starlight from '@astrojs/starlight';
// import starlightScrollToTop from 'starlight-scroll-to-top';
//
// export default defineConfig({
//   integrations: [
//     starlight({
//       plugins: [starlightScrollToTop({ position: 'left' })]
//     })
//   ]
// });
// ```