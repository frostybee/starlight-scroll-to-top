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
      plugins: [
        starlightScrollToTop({
          position: 'right',
          tooltipText: 'Back to top',
          showTooltip: true,
          smooth: true,
          threshold: 10,
          svgPath: 'M12 4L6 10H9V16H15V10H18L12 4M9 16L12 20L15 16',
          svgStrokeWidth: 2,
          borderRadius: '15',
          shouldScale: true,
        }
        )],
      sidebar: [
        {
          label: 'Start Here',
          collapsed: false,
          items: [{ slug: 'getting-started' },
          { slug: 'configuration' },

          ],
        },
        {
          label: 'Guides',
          collapsed: false,
          items: [
            { slug: 'svg-paths' }
          ],
        }
      ],
      social: [
        { href: 'https://github.com/frostybee/starlight-scroll-to-top', icon: 'github', label: 'GitHub' },
      ],
      title: 'Starlight Scroll to Top',
    }),
  ],
})
