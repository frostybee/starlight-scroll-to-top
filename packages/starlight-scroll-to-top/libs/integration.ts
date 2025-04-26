//starlightHelloWorldIntegration
import type { AstroIntegration } from 'astro'
import { helloWorldVitePlugin } from './vite.ts';    

// Astro integration
export function starlightHelloWorldIntegration(): AstroIntegration {
    return {
      name: 'starlight-hello-world',
      hooks: {
        'astro:config:setup': ({ updateConfig, config}) => {
          console.log('Hello World Plugin: Setting up integration');
          
          // Add our Vite plugin
          updateConfig({
            vite: {
              plugins: [helloWorldVitePlugin()]
            }
          });
          
          // You could add custom page extensions here
          // addPageExtension('.hello');
          
          // You could register custom content collection entry types
          // addContentEntryType({
          //   contentEntryType: 'hello',
          //   extensions: ['.hello.md', '.hello.mdx'],
          // });
        },
        
        // 'astro:build:setup': ({ build }) => {
        //   console.log('Hello World Plugin: Build setup');
        // },
        
        'astro:build:done': ({ pages, dir }) => {
          console.log(`Hello World Plugin: Build completed with ${pages.length} pages`);
        },
        
        'astro:server:setup': ({ server }) => {
          console.log('Hello World Plugin: Dev server started');
        }
      }
    };
  }
  
  // Export additional components or utilities
  export function HelloWorldComponent() {
    return `<div class="hello-world-component">Hello from Starlight plugin!</div>`;
  }