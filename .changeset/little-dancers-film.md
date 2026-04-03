---
"starlight-scroll-to-top": major
---

threshold option now uses absolute pixels instead of percentage

The `threshold` option now accepts an absolute pixel value instead of a percentage of the total page height. This provides consistent button visibility behavior regardless of page length.

**Breaking change:** Update any existing `threshold` values in your configuration. For example, `threshold: 30` (30%) should be replaced with an absolute pixel value such as `threshold: 300` (300px).

The default value has changed from `30` (30%) to `300` (300px).