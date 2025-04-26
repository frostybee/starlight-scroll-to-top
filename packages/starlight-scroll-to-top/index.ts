import type { StarlightPlugin } from '@astrojs/starlight/types'

//import starlightScrollToTopIntegration   from "./libs/scroll-integration.ts";
import starlightScrollToTopIntegration   from "./libs/good-integration.ts";

// Define configuration options type
export interface ScrollToTopOptions {
  /**
   * Position of the scroll to top button
   * @default 'right'
   */
  position?: 'left' | 'right';
}
export default function starlightScrollToTop(userConfig: ScrollToTopOptions= {}): StarlightPlugin {
  return {
    name: 'starlight-scroll-to-top',
    hooks: {
      'config:setup'({  addIntegration, config, logger, updateConfig }) {
        /**
         * This is the entry point of your Starlight plugin.
         * The `setup` hook is called when Starlight is initialized (during the Astro `astro:config:setup` integration
         * hook).
         * To learn more about the Starlight plugin API and all available options in this hook, check the Starlight
         * plugins reference.
         *
         * @see https://starlight.astro.build/reference/plugins/
         */        
        logger.info('Hello from the starlight-scroll-to-top plugin!')
        addIntegration(starlightScrollToTopIntegration(userConfig));
      },
    },
  }
}
