// Define configuration options type
export default interface ScrollToTopOptions {
  /**
   * Position of the scroll to top button
   * @default 'right'
   */
  position?: 'left' | 'right';
  
  /**
   * Text to show in the tooltip
   * @default 'Scroll to top'
   */
  tooltipText?: string;

  /**
   * Whether to show the tooltip on hover
   * @default false    
   */
  showTooltip?: boolean;

  /**
   * Whether to use smooth scrolling
   * @default false
   */
  smooth?: boolean;

  /**
   * Height after page scroll to be visible (percentage)
   * @default 30
   */
  threshold?: number;

  /**
   * The SVG icon fill color
   * @default "#fff" (uses currentColor)
   */
  svgFillcolor?: string;

  /**
   * The SVG icon path d attribute
   * @default "M18 15l-6-6-6 6"
   */
  svgPath?: string;

  
  /**
   * The SVG icon stroke width
   * @default "2" 
   */
  svgStrokeWidth?: number;

  /**
   * The SVG icon width
   * @default "24"
   */
  width?: string;

  /**
   * The SVG icon height
   * @default "24"
   */
  height?: string;

  /**
   * The SVG icon viewBox attribute
   * @default "0 0 24 24"
   */
  viewBox?: string;

  /**
   * The radius of the button corners. 50% for circle, 0% for square
   * @default "15"
   */
  borderRadius?: string;
  
}