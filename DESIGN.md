# Design System Specification: High-End Editorial E-Commerce

## 1. Overview & Creative North Star

**Creative North Star: "The Architectural Curator"**

This design system moves away from the "generic storefront" by treating the digital interface as a high-end physical gallery. It rejects the noisy, boxed-in layouts of traditional e-commerce in favor of **Architectural Whitespace** and **Tonal Depth**.

The goal is to foster an atmosphere of "Quiet Authority." We achieve this through:

- **Intentional Asymmetry:** Breaking the 12-column rigidity by allowing hero imagery and typography to overlap across different surface tiers.
- **Layered Sophistication:** Moving beyond flat UI to a system of "stacked materials" (fine paper and frosted glass).
- **Editorial Scaling:** Using dramatic shifts in typography scale—pairing massive, thin display heads with tight, functional labels to guide the eye like a premium magazine.

---

## 2. Colors & Surface Philosophy

The palette is rooted in a "Midnight & Slate" foundation, using deep neutrals to provide a stable, trustworthy base for high-vibrancy accents.

### Color Tokens

- **Primary (`#000000`):** Used for absolute authority—high-level headers and primary CTAs.
- **Primary Container (`#131b2e`):** A deep, nocturnal navy used for immersive sections and footer backgrounds.
- **Secondary (`#515f74`):** A muted slate that provides a bridge between the dark primary and light surfaces.
- **Tertiary Fixed (`#6ffbbe`):** The "Emerald Glow"—used sparingly for micro-interactions, stock status, or high-conversion triggers.

### The "No-Line" Rule

**Explicit Instruction:** Do not use `1px` solid borders to separate sections. We define boundaries exclusively through background shifts.

- **Example:** A product description block in `surface-container-low` should sit directly against a `surface` background. The change in hex code is the divider; lines are considered visual clutter.

### Surface Hierarchy & Glassmorphism

Treat the UI as a series of physical layers.

- **Base:** `surface` (`#f7f9fb`)
- **Nesting:** Use `surface-container-low` for large content blocks and `surface-container-highest` for interactive elements like floating navigation or quick-view modals.
- **The "Glass" Rule:** For floating headers or overlays, use `surface-container-lowest` at 80% opacity with a `backdrop-blur` of `20px`. This allows the "Emerald" or "Navy" accents to bleed through, creating a sense of environmental integration.

---

## 3. Typography

We utilize a pairing of **Manrope** (Display/Headlines) for its geometric, modern personality and **Inter** (Body/Labels) for its world-class legibility.

| Level           | Font    | Size        | Intent                                                    |
| :-------------- | :------ | :---------- | :-------------------------------------------------------- |
| **Display-LG**  | Manrope | `3.5rem`    | High-impact hero messaging. Use -2% letter spacing.       |
| **Headline-MD** | Manrope | `1.75rem`   | Category titles. Semi-bold for authority.                 |
| **Title-SM**    | Inter   | `1rem`      | Product names and card headers.                           |
| **Body-MD**     | Inter   | `0.875rem`  | Description text. High line-height for readability.       |
| **Label-SM**    | Inter   | `0.6875rem` | Micro-metadata (SKUs, Tags). Uppercase with +5% tracking. |

---

## 4. Elevation & Depth

In this system, depth is a feeling, not a drop-shadow.

- **Tonal Layering:** Instead of shadows, stack `surface-container-lowest` cards on a `surface-container-high` background. This creates a "lift" that feels organic to the architecture.
- **Ambient Shadows:** For high-priority floating elements (e.g., a "Cart" drawer), use an ultra-diffused shadow:
- _Shadow:_ `0px 20px 40px rgba(25, 28, 30, 0.06)` (Tinted by `on-surface`).
- **The Ghost Border Fallback:** If a container absolutely requires a border (e.g., a text input on a white background), use `outline-variant` at 20% opacity. **Never use 100% opaque outlines.**

---

## 5. Component Guidelines

### Buttons (The "Soul" of the Interaction)

- **Primary:** Solid `primary` background with `on-primary` text. Use `rounded-md` (`0.375rem`).
- **Secondary:** `secondary-container` background.
- **Interaction:** On hover, apply a subtle gradient transition from `primary` to `primary-container` to add "shimmer" and depth.

### Cards & Product Grids

- **No Dividers:** Separate product cards using the `spacing-8` (`2rem`) gap.
- **Structure:** Image at the top, followed by a `title-sm` header. Metadata (Price) uses `tertiary-fixed-dim` for the container background to make the price "pop" without looking cheap.
- **Floating State:** On hover, a card should shift from `surface-container-low` to `surface-container-lowest` and gain an **Ambient Shadow**.

### Input Fields

- **State:** Default state is a "Ghost Border" on `surface-container-highest`.
- **Focus State:** The border transitions to `primary` (black) at 100% opacity, and the label moves into a `label-sm` position using the `tertiary` emerald color to signal "active" status.

### Custom Component: The "Editorial Overlap"

- **Definition:** A component where a high-resolution product image (offset) is partially covered by a `surface-container-lowest` text block containing a `headline-lg` and a CTA. This breaks the grid and feels like a bespoke magazine layout.

---

## 6. Do’s and Don’ts

### Do:

- **Use Asymmetric Spacing:** Use `spacing-24` (`6rem`) for top-level section padding to create "breathing room."
- **Embrace Tonal Shifts:** Use the `surface-container` scale to group related items instead of using boxes.
- **Prioritize Typography:** Let the font size do the talking. If an element needs more "weight," increase the font size before you consider adding a color or a border.

### Don't:

- **No Hard Outlines:** Never use high-contrast, 100% opaque borders for containers.
- **No Generic Shadows:** Avoid "standard" Figma shadows. If it looks like a default, it’s wrong. Shadows must be large, soft, and barely visible.
- **No "Flat" Buttons:** Avoid perfectly flat, matte colors for large CTAs; use a subtle 5% vertical gradient to give the button a "tangible" feel.
- **No Divider Lines:** In lists or menus, use `spacing-4` gaps or `surface-variant` background shifts rather than horizontal rules (`
`).

---

## 7. Responsive Scalability

The "Editorial Overlap" components should collapse into a vertical "Layered Stack" on mobile. The typography remains bold—`display-sm` on mobile is still a massive `2.25rem`, ensuring the brand’s "Architectural" feel is preserved even on smaller glass.```
