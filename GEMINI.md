# Orbis Arcana Sheet

## Project Overview

**Orbis Arcana Sheet** is a web-based character sheet manager for the "Orbis Arcana" Role-Playing Game system. It is built using Next.js (React) and TypeScript, designed to provide a digital interface for creating, managing, and storing character data.

### Key Features
*   **Digital Character Sheet:** Interactive interface for managing character stats, skills, inventory, and talents.
*   **State Management:** Uses [Zustand](https://github.com/pmndrs/zustand) for efficient and reactive state handling.
*   **Persistence:**
    *   **Browser Storage:** Automatically saves progress to `localStorage`.
    *   **JSON Import/Export:** Allows users to download their character data as JSON files and upload them to restore or transfer characters.
    *   **Backend Storage:** Includes a file-based JSON database (`data/db.json`) for server-side persistence (managed via `utils/db.ts`).
*   **Responsive Design:** Styled with Tailwind CSS to work across devices.

## Tech Stack
*   **Framework:** Next.js 16
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS v4
*   **State Management:** Zustand
*   **Linting:** ESLint

## Building and Running

### Prerequisites
*   Node.js (v20 or higher recommended)
*   npm, yarn, pnpm, or bun

### Scripts
The following scripts are available in `package.json`:

*   `npm run dev`: Starts the development server on `http://localhost:3000`.
*   `npm run build`: Builds the application for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure

### Key Directories
*   `app/`: Next.js App Router pages and API routes.
    *   `api/`: Backend API routes for authentication and sheet management.
    *   `sheet/`: Character sheet page.
*   `src/`: Application source code.
    *   `components/`: React components, organized by feature (e.g., `sheet/` for specific character sheet sections).
        *   `CharacterSheet.tsx`: Main component assembling the sheet.
    *   `stores/`: Zustand store definitions (`useSheetStore.ts`).
    *   `constant/`: Constant values and initial data (`initialData.ts`).
*   `data/`: Contains `db.json` for server-side data storage.
*   `utils/`: Utility functions, including `db.ts` for file-system database operations.
*   `public/`: Static assets (images, icons).

## Development Conventions

*   **Type Safety:** Strict TypeScript usage is encouraged. Interfaces for data models (like `CharacterData`) are defined in `src/components/CharacterSheet.tsx` or `src/components/sheet/sheet.interface.ts`.
*   **State Patterns:** Global character state is managed via Zustand hooks (`useSheet`, `useUpdateSheet`). Components should subscribe to specific slices of state where possible to minimize re-renders.
*   **Styling:** Utility-first CSS using Tailwind. Components should be responsive and consistent with the dark-themed UI.
*   **Data Flow:**
    *   Client-side state is the source of truth during editing.
    *   Changes are synced to `localStorage`.
    *   Server-side operations (in `utils/db.ts`) manipulate the `data/db.json` file directly using Node.js `fs` module.
