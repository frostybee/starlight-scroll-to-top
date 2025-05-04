import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightScrollToTop from 'starlight-scroll-to-top'

const siteURI = 'https://frostybee.github.io';
export default defineConfig({
  site: siteURI,
  base: "/starlight-scroll-to-top",
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/frostybee/starlight-scroll-to-top/edit/main/docs/',
      },
      plugins: [starlightScrollToTop({ position: 'right' })],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ slug: 'getting-started' }, { slug: 'configuration' }],          
        },
      ],
      social: [
        { href: 'https://github.com/frostybee/starlight-scroll-to-top', icon: 'github', label: 'GitHub' },
      ],
      title: 'Starlight Scroll to Top',
    }),
  ],
})
