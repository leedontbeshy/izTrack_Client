# izTrack Design System

## Overview
Modern, clean UI redesign with flat colors, strong hierarchy, balanced whitespace, and premium feel.

## Design Principles
- **Flat Colors Only**: No gradients, pure solid colors
- **Strong Visual Hierarchy**: Clear distinction between primary, secondary, and tertiary content
- **Balanced Whitespace**: Generous spacing for better readability
- **Rounded Corners**: Smooth, modern feel with consistent border radius
- **Soft Shadows**: Subtle depth without gradients
- **High-Contrast CTAs**: Action buttons stand out clearly
- **Premium Feel**: Attention to detail, smooth animations, and polished interactions

## Color Palettes

### Palette 1: Modern Blue (Default - Active)
```css
--color-primary-bg: #f8f9fa       /* Light gray background */
--color-secondary-bg: #ffffff      /* Pure white cards */
--color-accent: #2563eb            /* Vibrant blue */
--color-accent-hover: #1d4ed8      /* Darker blue on hover */
--color-text-primary: #1e293b      /* Near black text */
--color-text-secondary: #64748b    /* Medium gray text */
--color-text-muted: #94a3b8        /* Light gray text */
--color-border: #e2e8f0            /* Subtle borders */
--color-success: #10b981           /* Green for success states */
--color-warning: #f59e0b           /* Amber for warnings */
--color-error: #ef4444             /* Red for errors */
--color-info: #06b6d4              /* Cyan for info */
```

**Best for**: Professional, corporate, tech applications

---

### Palette 2: Vibrant Orange
```css
--color-primary-bg: #fef3f2
--color-secondary-bg: #ffffff
--color-accent: #f97316
--color-accent-hover: #ea580c
--color-text-primary: #292524
--color-text-secondary: #78716c
--color-text-muted: #a8a29e
--color-border: #e7e5e4
--color-success: #22c55e
--color-warning: #eab308
--color-error: #dc2626
--color-info: #14b8a6
```

**Best for**: Energetic, creative, e-commerce applications
**To activate**: Uncomment this palette in `src/style.css` and comment out others

---

### Palette 3: Fresh Green
```css
--color-primary-bg: #f0fdf4
--color-secondary-bg: #ffffff
--color-accent: #16a34a
--color-accent-hover: #15803d
--color-text-primary: #18181b
--color-text-secondary: #52525b
--color-text-muted: #a1a1aa
--color-border: #e4e4e7
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444
--color-info: #06b6d4
```

**Best for**: Eco-friendly, health, wellness applications
**To activate**: Uncomment this palette in `src/style.css` and comment out others

---

### Palette 4: Deep Purple
```css
--color-primary-bg: #faf5ff
--color-secondary-bg: #ffffff
--color-accent: #9333ea
--color-accent-hover: #7e22ce
--color-text-primary: #1e1b4b
--color-text-secondary: #6366f1
--color-text-muted: #a5b4fc
--color-border: #e0e7ff
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444
--color-info: #8b5cf6
```

**Best for**: Creative, artistic, premium applications
**To activate**: Uncomment this palette in `src/style.css` and comment out others

---

### Palette 5: Elegant Teal
```css
--color-primary-bg: #f0fdfa
--color-secondary-bg: #ffffff
--color-accent: #14b8a6
--color-accent-hover: #0d9488
--color-text-primary: #0f172a
--color-text-secondary: #475569
--color-text-muted: #94a3b8
--color-border: #e2e8f0
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444
--color-info: #06b6d4
```

**Best for**: Medical, financial, trustworthy applications
**To activate**: Uncomment this palette in `src/style.css` and comment out others

---

## Typography

### Font Family
- Primary: `Inter, system-ui, -apple-system, sans-serif`
- Optimized for readability and modern feel

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Line Heights
- Body text: 1.6
- Headings: 1.2

---

## Spacing System
Based on 8px grid for consistency:
- xs: 0.25rem (4px)
- sm: 0.5rem (8px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)
- 3xl: 4rem (64px)

---

## Border Radius
- Small: 0.5rem (8px)
- Medium: 0.75rem (12px)
- Large: 1rem (16px)
- Extra Large: 1.5rem (24px)
- Full: 9999px (circular)

---

## Shadows
Soft, subtle shadows for depth (no gradients):
- Small: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- Medium: `0 4px 6px -1px rgb(0 0 0 / 0.1)`
- Large: `0 10px 15px -3px rgb(0 0 0 / 0.1)`
- Extra Large: `0 20px 25px -5px rgb(0 0 0 / 0.1)`

---

## Components

### Buttons
**Primary Button** (`.btn-primary`):
- Background: accent color
- Text: white
- Hover: darker accent + lift effect
- Shadow: small to medium on hover
- Border radius: medium
- Padding: 0.75rem 1.5rem

**Secondary Button** (`.btn-secondary`):
- Background: white
- Text: primary text color
- Border: 1px solid border color
- Hover: background becomes primary-bg
- Minimal shadow

### Cards
**Elevated Card** (`.card-elevated`):
- Background: white
- Border: 1px solid border color
- Border radius: large
- Shadow: large
- Used for primary content

**Flat Card** (`.card-flat`):
- Background: white
- Border: 1px solid border color
- Border radius: medium
- No shadow
- Used for secondary content

### Inputs
**Modern Input** (`.input-modern`):
- Background: white
- Border: 2px solid border color
- Border radius: medium
- Focus: accent border + subtle ring
- Padding: 0.875rem 1rem

### Badges
**Status Badges**:
- Border radius: full (pill shape)
- Padding: 0.5rem 1rem
- Font weight: semibold
- Color-coded by status

---

## Layout

### Container
- Max width: 1280px
- Horizontal padding: 1rem (mobile), 2rem (desktop)
- Centered with auto margins

### Hero Section
- Vertical padding: 4rem (mobile), 6rem (desktop)
- Centered content
- Clear visual hierarchy

### Grid System
- 1 column (mobile)
- 2 columns (tablet: 768px+)
- 3-4 columns (desktop: 1024px+)
- Gap: 1rem to 1.5rem

---

## Animations

### Transitions
All transitions use `ease` timing:
- Color changes: 0.2s
- Transform: 0.2s
- Opacity: 0.2s

### Hover Effects
- Buttons: Lift (-1px translateY) + shadow increase
- Cards: Lift (-2px translateY) + shadow
- Links: Color change + underline animation

### Focus States
- 2px ring in accent color
- Smooth transition
- No ring offset

---

## Accessibility

- **Color Contrast**: All text meets WCAG AA standards
- **Focus Indicators**: Clear, visible focus states
- **Touch Targets**: Minimum 44x44px for interactive elements
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **ARIA Labels**: Where needed for screen readers

---

## Responsive Design

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1023px
- Desktop: 1024px+

### Mobile-First Approach
- Base styles for mobile
- Progressive enhancement for larger screens
- Touch-friendly interactions

---

## Usage Examples

### Switching Color Palettes
1. Open `src/style.css`
2. Find the `@theme` section
3. Comment out the current active palette
4. Uncomment your desired palette
5. Save and the app will automatically update

### Using Component Classes
```html
<!-- Primary Button -->
<button class="btn-primary">Click Me</button>

<!-- Elevated Card -->
<div class="card-elevated p-6">Content</div>

<!-- Modern Input -->
<input class="input-modern" placeholder="Enter text">

<!-- Badge -->
<span class="badge-status">Status</span>
```

---

## Best Practices

1. **Consistency**: Use design tokens (CSS variables) throughout
2. **Whitespace**: Don't be afraid of empty space
3. **Hierarchy**: Make important elements stand out
4. **Simplicity**: Remove unnecessary decorative elements
5. **Performance**: Flat colors are faster to render than gradients
6. **Testing**: Test on multiple devices and screen sizes

---

## Future Enhancements

Potential additions while maintaining flat design:
- Dark mode support (with flat colors)
- Additional color palette variations
- Pattern library documentation
- Figma/Sketch design files
- Component playground
- Accessibility testing suite
