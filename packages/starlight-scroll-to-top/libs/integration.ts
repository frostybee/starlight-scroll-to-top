import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import {readFileSync } from 'node:fs';

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

        // Synchronously read the file content         
        const fileContent = readFileSync(join(__dirname, 'scroll-to-top.js'), 'utf-8');

        // Inject client-side script that will handle scroll behavior        
        logger.info('Injecting scroll to top script...');
        logger.info(fileContent);

        // Pass the configuration as stringified JSON
        injectScript('page', `
            ${fileContent};
            initScrollToTop(${JSON.stringify(config)});          
          `);
      },      
      'astro:build:done': ({ dir, logger }) => {
        logger.info(`Starlight Scroll To Top plugin has been installed successfully! Button position: ${config.position}`);
      }
    }
  };
}
