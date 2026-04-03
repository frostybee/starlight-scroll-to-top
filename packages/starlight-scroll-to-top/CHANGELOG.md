# starlight-scroll-to-top

## 1.0.1

### Patch Changes

- [`9534f53`](https://github.com/frostybee/starlight-scroll-to-top/commit/9534f53a679141e2d26cfddd9aa62c3714f3c05d) Thanks [@frostybee](https://github.com/frostybee)! - Fix npm publish issue by bumping past unpublishable version 1.0.0

## 1.0.0

### Major Changes

- [`96d9709`](https://github.com/frostybee/starlight-scroll-to-top/commit/96d970934dd429b93eec156dcd24eac5494682be) Thanks [@frostybee](https://github.com/frostybee)! - threshold option now uses absolute pixels instead of percentage

  The `threshold` option now accepts an absolute pixel value instead of a percentage of the total page height. This provides consistent button visibility behavior regardless of page length.

  **Breaking change:** Update any existing `threshold` values in your configuration. For example, `threshold: 30` (30%) should be replaced with an absolute pixel value such as `threshold: 300` (300px).

  The default value has changed from `30` (30%) to `300` (300px).

## 0.4.0

### Minor Changes

- [#16](https://github.com/frostybee/starlight-scroll-to-top/pull/16) [`dfa8aa9`](https://github.com/frostybee/starlight-scroll-to-top/commit/dfa8aa9bdefc461bb476239190d5fcc2edf29ebf) Thanks [@frostybee](https://github.com/frostybee)! - \* Added I18N support for tooltipText
  - Added option to enable the button on Starlight's landing page, along with styling improvements
  - Added showOnHomepage boolean option (default: false)

## 0.3.1

### Patch Changes

- [`078a0dd`](https://github.com/frostybee/starlight-scroll-to-top/commit/078a0dd2767ba4653974df47dc25fa6732560456) Thanks [@frostybee](https://github.com/frostybee)! - Add Astro view transitions support, scroll progress indicator, homepage detection, improved styling, and performance optimizations

## 0.3.0

### Minor Changes

- [`b07e25f`](https://github.com/frostybee/starlight-scroll-to-top/commit/b07e25f49bf0fd9eba2a0cc0edf8c57d87e32584) Thanks [@frostybee](https://github.com/frostybee)! - Add Astro view transitions support, scroll progress indicator, homepage detection, improved styling, and performance optimizationsAdd Astro view transitions support, scroll progress indicator, homepage detection, improved styling, and performance optimizations

## 0.2.1

### Patch Changes

- [`212acc5`](https://github.com/frostybee/starlight-scroll-to-top/commit/212acc59d020cef31fa2f4e4609fe88b0cbdae91) Thanks [@frostybee](https://github.com/frostybee)! - Fix publishing issue

## 0.2.0

### Minor Changes

- [#8](https://github.com/frostybee/starlight-scroll-to-top/pull/8) [`4b70c3d`](https://github.com/frostybee/starlight-scroll-to-top/commit/4b70c3d1a00339775e27d1d286d534df917b1c5e) Thanks [@frostybee](https://github.com/frostybee)! - Add Astro view transitions support, homepage detection, improved styling, and performance optimizations

## 0.1.1

### Patch Changes

- [`7f4e957`](https://github.com/frostybee/starlight-scroll-to-top/commit/7f4e9571eeecd0e7f6adbfdc96d86ba695ea907e) Thanks [@frostybee](https://github.com/frostybee)! - "Fix conflicting changeset and publish public release"
