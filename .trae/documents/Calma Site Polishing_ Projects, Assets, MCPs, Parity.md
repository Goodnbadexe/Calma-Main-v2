## Goals
- Make Projects.tsx highly usable with an immersive SVG and a clean grid view.
- Clean asset structure: move all PDFs into `doc/` subfolders and update references.
- Ensure English/Arabic pages have parity in structure and routing.
- Add BrowserMCP, Magic MCP, and Context7 MCP servers to the workspace config.
- Confirm burger button shows only on mobile.
- Verify with a local preview and push when green.

## Current State (Verified)
- Projects page uses dynamic data and a view toggle: `src/pages/english/Projects/Projects.tsx:23-32, 161-189`.
- Portfolio grid component exists: `src/components/ui/portfolio-gallery.tsx`.
- Featured carousel loads data from `projects.data.ts`: `src/components/home/FeaturedProjectsCarousel.tsx:15-23`.
- Asset resolver centralizes image URLs: `src/utils/assetResolver.ts:24-35`.
- Burger button hidden on desktop: `src/components/ui/NavBar.tsx:319`.
- English pages: About, Contact, Home, News, Projects, Register.
- Arabic pages: الأخبار، التسجيل، الرئيسية، المشاريع، تواصل معنا، عن كالما.
- Some PDFs already under `doc/` (e.g., JN130, Calma Tower), many still in project folders.
- No MCP configs present in the repo.

## Implementation Plan

### 1) Assets Cleanup
- Create `doc/` subfolder under each project directory that contains PDFs.
- Move all `*.pdf` from project image folders (and any `*Models` subfolders) into the corresponding `doc/`.
- Update paths in `src/data/projects.data.ts` to point to the new `doc/` locations (e.g., `jn130`, `ys200`, `ys190`, `nk250`, `ht260`, `sa230`, `rm240`).
- Keep images only inside `Images/*` subtrees; use `pickPreviewImage` for cover selection.
- Verify no references break by running the site and opening all projects.

### 2) Projects Page UX polish
- Keep immersive SVG map interaction and scroll/slider sync.
- Confirm grid view uses `PortfolioGallery` with `images={projects.map(...)}` and click sets `selectedProject`.
- Refine responsive behavior: test md+ sidebar styles and mobile bottom slider.
- Minor fix: check any suspicious path data or typos within the SVG paths; ensure hover/active classes work.

### 3) English/Arabic Parity
- Verify each English page has its Arabic counterpart and that nav routes map correctly via `NavBar`.
- Align the Register pages content/validation between `english/Register` and `arabic/التسجيل` where feasible.
- Confirm RTL styling works on Arabic pages and links resolve correctly.

### 4) MCP Servers Integration
- Add MCP servers to the project’s MCP config (create `mcp.config.json` at repo root if none exists).
- Entries:
  - BrowserMCP: `{ "id": "browsermcp", "server": "https://github.com/browsermcp/mcp", "type": "http" }`
  - Magic MCP: `{ "id": "magic-mcp", "server": "https://github.com/21st-dev/magic-mcp", "type": "http" }`
  - Context7: `{ "id": "context7", "server": "https://github.com/upstash/context7", "type": "http" }`
- Add npm scripts to start MCP servers locally where applicable or document the run commands if they are external.

### 5) 21st-dev CLI
- Install with the provided command.
- Validate compatibility in this Trae project; if needed, pin versions or make minimal usage (we already leverage a gallery component).
- Optionally import additional luxury UI components where they add value (cards, dialogs) without breaking existing patterns.

### 6) Cleanup (Desktop.ini/Docker)
- Remove any `desktop.ini` remnants.
- Remove unused `Dockerfile`/`.dockerignore` if present.

### 7) Verification & Preview
- Run the dev server; verify:
  - Projects immersive map interaction and grid toggle.
  - Portfolio gallery layout across breakpoints.
  - English/Arabic routes and RTL.
  - PDF links exist under the new `doc/` structure.
- Provide a preview URL when the server is live.

### 8) Push
- When everything is green, push the branch to GitHub.

## Deliverables
- Updated asset tree with all PDFs under `doc/`.
- Synced `projects.data.ts` PDF references.
- Polished Projects page UX with verified interactions.
- MCP servers config file with the three servers.
- Optional 21st-dev component enhancements.
- Verified site preview and Git push.

## Assumptions
- MCP config root file `mcp.config.json` is acceptable if no workspace-level config exists.
- Using existing toolchain (Vite + React + Tailwind) and not introducing new frameworks.

## Request
I will proceed with these changes end-to-end, run the site to validate, and push when everything is working. Confirm to execute.