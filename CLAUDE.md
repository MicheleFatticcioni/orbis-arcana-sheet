# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Orbis Arcana Sheet** is a digital character sheet for the Orbis Arcana tabletop RPG. Built with Next.js 16, React 19, TypeScript, Tailwind CSS, and Zustand for state management.

## Development Commands

```bash
npm run dev       # Start development server on http://localhost:3000
npm run build     # Build for production
npm start         # Start production server (requires build first)
npm run lint      # Run ESLint checks
```

## Architecture

### State Management (Zustand)

**File: `src/stores/useSheetStore.ts`**
- Central store using Zustand for character sheet state
- Exports utility hooks via `src/stores/useSheetStore.state.ts` for accessing specific state slices
- Mutation pattern: each store has an `update*` method for specific data sections (info, stats, skills, tracks, inventory, weapons, talents)

**Character Data Structure:**
- `info`: name, alias, profession
- `stats`: forza (Strength), agilita (Agility), spirito (Spirit), ingegno (Intellect)
- `skills`: 13 skills mapped to stats (e.g., prestanza, resistenza under forza; armi-da-fuoco, furtivita under agilita)
- `tracks`: health (salute), stress, cursed dice (dadi maledetti)
- `weapons`: array of 6 weapon slots
- `talents`: list with name, level, page reference
- `inventory`: free-form text field

### Component Structure

**Main Component: `src/components/CharacterSheet.tsx`**
- Client component that renders the full character sheet
- Manages pregenerated character loading via `PregeneratedLoader`

**Sheet Sub-Components (in `src/components/sheet/`)**
- `BaseInfo.tsx` — name, alias, profession fields
- `Attributes.tsx` — the 4 base stats with editable inputs
- `Ability.tsx` — skill display and roll system
- `Points.tsx` — health, stress, cursed dice trackers
- `Inventory.tsx` — free-form text equipment field
- `Wapons.tsx` — 6 weapon slot management
- `Talents.tsx` — talent tracking with level and page reference
- `SkillRollModal.tsx` — modal for rolling attribute + skill with cursed dice modifier
- `PregeneratedLoader.tsx` — loads pregenerated character JSON files

All components use Zustand hooks (`useSheet`, `useUpdate*`) to read/write state. Components are UI-focused; business logic stays in the store.

### Routing (Next.js App Router)

- `app/page.tsx` — landing/home page
- `app/sheet/page.tsx` — main character sheet interface
- `app/login/page.tsx` — authentication entry point
- `app/api/` — API routes (auth, etc.)

### Utilities & Constants

- `src/constant/initialData.ts` — default character data used when loading a new sheet
- `utils/auth.ts` — JWT authentication helpers using `jose` library
- `utils/db.ts` — data persistence (file-based or external)

### Assets

- `public/pregenerated/` — pregenerated character JSON templates
- `public/dice/` — dice roll assets or icons

## Key Dependencies

- **zustand** — state management (create store, hooks for subscriptions)
- **jose** — JWT encoding/decoding for auth
- **tailwindcss** — utility-first styling with @tailwindcss/postcss v4
- **next** — framework and SSR
- **react**, **react-dom** — UI library

## Common Patterns

### Updating Character Data
```typescript
const updateStats = useUpdateStats();
updateStats('forza', 5);  // update specific stat
```

### Accessing Character State
```typescript
const sheet = useSheet();  // get full sheet
const skills = sheet.skills;  // access nested data
```

### Skill Rolls
Clicking a skill name triggers the `SkillRollModal` which rolls `attribute + skill + cursed dice modifier`.

## Testing & Deployment

- No test suite currently configured
- Lint with `npm run lint`
- Deploy to Vercel or self-host via `npm start`

## i18n & Styling

- HTML lang set to Italian (`lang="it"`)
- Uses custom fonts: Cinzel (headings), Roboto Mono (body)
- Responsive design with Tailwind breakpoints (mobile-first, `md:` for larger screens)
