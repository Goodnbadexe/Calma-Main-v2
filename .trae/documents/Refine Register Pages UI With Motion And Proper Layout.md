## Observed Issues
- Navbar overlaps content; page has no top spacing and text appears under header.
- Form fields render as plain browser inputs without visual hierarchy or spacing.
- Icons render at incorrect sizes (one giant checkmark), likely due to global styles or missing sizing.
- Content lacks structure: no clear card layout, grid, or sticky sidebar.
- Arabic page needs the same polished layout and spacing in RTL.

## Design Fixes
### Layout
- Add safe top padding (`pt-24`–`pt-28`) to the hero section to avoid navbar overlap.
- Constrain content to `max-w-6xl` containers; use `px-6` for consistent horizontal gutters.
- Use a two-column responsive grid (`lg:grid-cols-3`) where the form occupies `lg:col-span-2` and benefits are in a sticky sidebar.

### Form Styling
- Use existing `FormField` and `TextareaField` with `className="h-11"` for consistent input height and spacing.
- Group inputs into rows with `grid md:grid-cols-2 gap-6` for alignment and readability.
- Keep labels, error messages, and helper copy visually consistent.
- Submit button: full-width, rounded, primary color; disabled until agreement.

### Icons And Visuals
- Replace oversized/bullet-like icons with scoped inline SVGs sized via `w-5 h-5` and `flex-shrink-0`.
- Remove reliance on any global `.icon` class; scope each icon inside a 12×12 container with `bg-primary/10` and `text-primary`.
- Ensure success state uses a card with modest visuals, not a massive checkmark.

### Motion (Context7)
- Apply Framer Motion variants from Context7 best practices:
  - `containerVariants` with `staggerChildren` for grouped reveals.
  - `itemVariants` for each row/input group.
  - Animated hero section using `motion.div`.
- Optionally switch to `LazyMotion + domAnimation` if bundle size is a concern.

### Accessibility
- Labels bound via `htmlFor`/`id`; `role="status"` and `aria-live` on success.
- Maintain button disabled state and field-level error text.

### Arabic Parity
- Mirror English layout in RTL: same spacing (`pt-24` top), same grid structure, scoped icons sized correctly.
- Keep existing Arabic strings and validations.

## Implementation Steps
1. Update `src/pages/english/Register/Register.tsx`:
   - Add top hero spacing, container widths, responsive grid, and sticky benefits card.
   - Apply Framer Motion variants to hero and form groups.
   - Pass `className="h-11"` to `FormField` to standardize input height.
   - Replace benefit icons with scoped inline SVG (`w-5 h-5`, `flex-shrink-0`), remove any oversized icon source.
   - Keep API submit + telemetry and accessible success state.
2. Update `src/pages/arabic/التسجيل/التسجيل.tsx`:
   - Add top padding to avoid nav overlap; apply container/grid; scope icons and sizes.
   - Keep RTL direction and Arabic text; maintain API submit + telemetry.
3. Verify visually in the dev server: ensure no overlap, icons are correct size, form sections are structured and animated, and success state is tasteful and legible.

## Deliverables
- Polished, animated register page UI in English and Arabic with proper spacing, grid, icons, and form styling.
- No new dependencies; uses current components and Context7-backed motion patterns.
