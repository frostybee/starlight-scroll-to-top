import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightScrollToTop from 'starlight-scroll-to-top'

export default defineConfig({
  integrations: [
    starlight({
      editLink: {
        baseUrl: 'https://github.com/frostybee/starlight-scroll-to-top/edit/main/docs/',
      },
      plugins: [starlightScrollToTop({ position: 'right' })],
      sidebar: [
        {
          label: 'Start Here',
          items: [{ slug: 'getting-started' }],
        },
      ],
      social: [
        { href: 'https://github.com/frostybee/starlight-scroll-to-top', icon: 'github', label: 'GitHub' },
      ],
      title: 'starlight-scroll-to-top',
    }),
  ],
})
