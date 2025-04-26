// Vite plugin implementation
import type { ViteUserConfig } from "astro";

type VitePlugin = NonNullable<ViteUserConfig["plugins"]>[number];
export function helloWorldVitePlugin(): VitePlugin {
    return {
      name: 'starlight-hello-world-vite',
      configResolved(config) {
        console.log('Hello World Vite Plugin initialized with config:', config.mode);
      },
      transform(code, id) {
        // Example transform: Add a comment to markdown files
        if (id.endsWith('.md') || id.endsWith('.mdx')) {
          return {
            code: `${code}\n `,
            map: null
          };
        }
        return null;
      }
    };
  }