# AGENTS.md - Development Guidelines

## Build/Lint/Test Commands

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint with auto-fix on app directory
- `pnpm format` - Format code with Prettier
- `pnpm prettier` - Check Prettier formatting
- No test framework configured - verify changes manually

## Code Style & Conventions

- **Imports**: Use `@/` alias for app/_ and src/_ imports
- **Formatting**: Prettier config: 120 char width, single quotes, no semicolons, trailing commas
- **Types**: TypeScript with strict: false, prefer explicit types for props
- **Components**: Use default exports, PascalCase filenames, functional components
- **Styling**: Tailwind CSS classes, custom classnames allowed (tailwindcss/no-custom-classname: off)
- **Linting**: ESLint extends next/prettier, no-console: warn, no-var: error
- **File Structure**: app/ for Next.js pages, src/components/ for reusable components
- **Three.js**: Use @react-three/fiber and @react-three/drei, r3f tunnel pattern for persistence
- **Client Components**: Mark with 'use client' directive when needed
- **Meta**: Include proper SEO meta tags in layout files
