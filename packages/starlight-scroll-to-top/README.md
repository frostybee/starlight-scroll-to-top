<div align="center">
  <h1>starlight-scroll-to-top 🚀
 </h1>
  <p>A plugin for Astro Starlight that adds a "scroll to top" button to your documentation site.</p>
</div>

## Features

The button appears when users scroll down the page, providing an easy way to navigate back to the top of long documentation pages.

- 🚀 Smooth scrolling option for a better user experience
- 🌓 Light and dark theme support
- ⚙️ Highly configurable appearance and behavior
- 🎨 Uses Starlight's `--sl-` prefixed CSS variables for consistent styling
- 📱 Responsive design works on all devices
- 🔧 Configurable button position (left, center, or right)
- 🖌️ Customizable SVG icon

## Installation

```bash
npm install starlight-scroll-to-top
```

## Usage

Add the plugin to your `astro.config.mjs` file:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightScrollToTop from 'starlight-scroll-to-top';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      plugins: [starlightScrollToTop()]
    })
  ]
});
```

## Configuration

All [options are optional](https://frostybee.github.io/starlight-scroll-to-top/configuration/) with sensible defaults. You can customize the plugin with the following options:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightScrollToTop from 'starlight-scroll-to-top';

export default defineConfig({
  integrations: [
    starlight({
      title: 'My Docs',
      plugins: [
        starlightScrollToTop({
          // Button position
          position: 'left',          
          // Tooltip text
          tooltipText: 'Back to top',          
          showTooltip: true,
          // Use smooth scrolling
          smooth: true,        
          // Visibility threshold (show after scrolling 20% down)
          threshold: 20,          
          // Customize the SVG icon
          svgPath: 'M25 42 12 29 42 29Z',    
          svgStrokeWidth: 1, 
          borderRadius: '50',      
        })
      ]
    })
  ]
});
```

## Documentation

For more details, check out the [plugin documentation](https://frostybee.github.io/starlight-scroll-to-top/). 


## License

Licensed under the MIT License, Copyright © frostybee.

See [LICENSE](/LICENSE) for more information.
