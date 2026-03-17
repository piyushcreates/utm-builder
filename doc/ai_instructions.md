# AI Agent Instructions - UTM Builder

You are an AI assistant helping to maintain and improve the UTM Builder project.

## Project Overview
- **Type**: Vite + React 19 Web Application.
- **Styling**: Tailwind CSS + Shadcn UI (Radix).
- **Forms**: React Hook Form + Zod for validation.
- **Functionality**: Generates tracking URLs with UTM parameters.

## Design System (Social Masla)
- **Aesthetic**: Premium "Editorial" (high-contrast).
- **Colors**:
  - Background: `#F6F4EB` (Cream)
  - Layout Panels: `#EEEADE` (Deeper Cream)
  - Inverse/Dark: `#121417` (Charcoal)
  - Accent: `#16a34a` (Emerald Green)
- **Typography**:
  - Headings: `Outfit`
  - Body: `Inter`
- **Layout**: 1340px max-width, 140px/100px section padding, 20px card radius, 8px button radius.

## [0.2.0] - 2026-03-17
### Added
- Implemented **Social Masla Design System**.
- High-contrast premium "Editorial" aesthetic (Cream, Charcoal, Emerald).
- Outfit (Headings) and Inter (Body) typography.
- Updated `Header`, `Index`, `UTMFormCard`, and `OutputCard` to match brand standards.
- Responsive layout with 1340px max-width and brand-specific spacing.

## [0.1.0] - 2026-03-17
### Added
- Initial project setup with Vite, React, Tailwind CSS, Shadcn UI.
- Basic UTM form functionality with React Hook Form and Zod.
- Output display for generated URLs.

## Development Guidelines
- Follow the existing design system (Shadcn UI).
- Use Tailwind CSS for custom styling.
- All new features should be documented in `doc/versions.md`.
- Ensure accessibility (a11y) standards are met.
- Maintain clean, modular code in `src/components`.

## Key Files
- `src/components/UTMFormCard.tsx`: Core form logic.
- `src/components/OutputCard.tsx`: Displays generated URL.
- `tailwind.config.ts`: Tailwind configuration.
