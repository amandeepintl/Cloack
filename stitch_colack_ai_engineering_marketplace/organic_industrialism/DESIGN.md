---
name: Organic Industrialism
colors:
  surface: '#FFFFFF'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#404941'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#717970'
  outline-variant: '#c0c9be'
  surface-tint: '#2e6a41'
  primary: '#003b1b'
  on-primary: '#ffffff'
  primary-container: '#14532d'
  on-primary-container: '#87c695'
  inverse-primary: '#96d5a3'
  secondary: '#904d00'
  on-secondary: '#ffffff'
  secondary-container: '#fe932c'
  on-secondary-container: '#663500'
  tertiary: '#591d28'
  on-tertiary: '#ffffff'
  tertiary-container: '#75333e'
  on-tertiary-container: '#f79eaa'
  error: '#DC2626'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f2be'
  primary-fixed-dim: '#96d5a3'
  on-primary-fixed: '#00210d'
  on-primary-fixed-variant: '#12512c'
  secondary-fixed: '#ffdcc3'
  secondary-fixed-dim: '#ffb77d'
  on-secondary-fixed: '#2f1500'
  on-secondary-fixed-variant: '#6e3900'
  tertiary-fixed: '#ffd9dc'
  tertiary-fixed-dim: '#ffb2bb'
  on-tertiary-fixed: '#3c0613'
  on-tertiary-fixed-variant: '#73323d'
  background: '#F8F8F6'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  surface-secondary: '#F2F2EF'
  text-secondary: '#666666'
  border-subtle: '#E6E6E2'
  success: '#16A34A'
  primary-hover: '#166534'
typography:
  display:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  price-display:
    fontFamily: IBM Plex Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.02em
  label-caps:
    fontFamily: IBM Plex Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style

This design system embodies a "Warm Minimalist" aesthetic, blending the clinical precision of technology with the organic textures of high-end retail. It is designed to feel calm, intentional, and premium, evoking the tactile quality of physical materials like unbleached paper, brushed metal, and matte ceramics.

The design style is **Minimalism** with a focus on high-quality whitespace and structural integrity. It avoids trendy visual effects in favor of timeless layouts, clear information hierarchy, and a restrained color palette. Every element exists for a reason, creating a shopping experience that feels like walking through a curated gallery rather than a cluttered marketplace.

## Colors

The palette is rooted in nature-inspired neutrals and deep, forest-toned greens. The primary background is not a pure white, but a warm, slightly greyish-bone (`#F8F8F6`) which reduces eye strain and feels more premium.

- **Primary Brand:** A deep, sophisticated green used for primary calls to action and key brand moments.
- **Accent:** A warm amber used sparingly for alerts or high-priority badges.
- **Neutrals:** Text uses a high-contrast off-black to maintain legibility without the harshness of pure black.
- **Borders:** Extremely subtle, used only to define structure where whitespace alone is insufficient.

## Typography

The typographic system utilizes three distinct typefaces to separate brand voice from functional data. 

1. **Sora (Headings):** Bold and geometric. Used for marketing headers and product titles.
2. **Plus Jakarta Sans (Body):** Soft and modern. Used for all descriptive text, ensuring high readability and a welcoming tone.
3. **IBM Plex Sans (Functional):** An industrial, technical typeface used for prices, technical specifications, and tabular data. This creates a visual distinction between the "emotional" brand copy and the "rational" product data.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop to maintain a premium, editorial feel, while transitioning to a fluid model for mobile devices. 

- **Grid:** Use a 12-column grid for desktop (1280px max-width) and a 4-column grid for mobile.
- **Rhythm:** A 4px baseline grid governs all internal component spacing.
- **Whitespace:** Emphasize vertical rhythm. Section gaps should be generous (80px+) to allow the products to "breathe" and prevent the UI from feeling congested.
- **Alignment:** Elements should feel mathematically aligned, utilizing the spacing units for consistent padding across cards and containers.

## Elevation & Depth

This design system avoids heavy shadows and traditional skeuomorphism. Depth is communicated primarily through **Tonal Layers** and extremely **Ambient Shadows**.

- **Layers:** The background (`#F8F8F6`) acts as the canvas. The Surface (`#FFFFFF`) is the primary interactive layer. The Secondary Surface (`#F2F2EF`) is used for recessed areas like footer sections or inactive input backgrounds.
- **Shadows:** Only one shadow style is permitted: an ultra-soft, diffused shadow with a large blur radius and very low opacity (2-4%). It should look like a natural shadow from soft, overhead lighting rather than a digital effect.
- **Borders:** Thin, 1px borders (`#E6E6E2`) are used to define boundaries on white surfaces where tonal contrast is insufficient.

## Shapes

The shape language is defined by a consistent **12px (0.75rem)** radius for all primary containers and buttons. This "Rounded" approach softens the industrial layout and makes the interface feel more approachable and modern.

- **Small elements (Tags/Chips):** Use the base 8px (0.5rem) radius.
- **Primary Containers (Cards/Modals):** Use the signature 12px (0.75rem) radius.
- **Image Containers:** Must always match the container radius to maintain a cohesive silhouette.

## Components

- **Buttons:** Primary buttons use the Brand Green (`#14532D`) with white text. They should have a subtle hover transition to a deeper green (`#166534`). Secondary buttons are outlined with 1px borders and no fill. Use 16px horizontal padding and 12px vertical padding.
- **Inputs:** Fields use a 1px border. On focus, the border should darken to the Primary Text color (`#151515`). Labels use `body-sm` in Secondary Text.
- **Cards:** Product cards should be minimal. No borders; use the ambient shadow on hover to indicate interactivity. Text alignment within cards should be left-aligned for a clean vertical axis.
- **Chips/Badges:** Use `label-caps` typography. High-contrast (Black/White) for brand-new items, and Accent Amber (`#D97706`) for limited stock.
- **Lists:** Use Lucide icons (20px) for list indicators. Maintain high leading (line-height) to ensure readability.
- **Checkboxes/Radios:** Square-ish with the same 4px small-radius. When active, fill with Primary Brand color.
- **Icons:** Use **Lucide Icons** with a `thin` or `regular` stroke weight (1.5px to 2px). Avoid filled icons unless used as a primary status indicator.