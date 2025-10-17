# Alicja Maksymowicz - Sanity Studio

Modern Sanity Content Studio with Biome linting, Lefthook git hooks, and conventional commits.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended package manager)

### Setup

1. **Clone and install dependencies:**
   ```bash
   pnpm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your actual Sanity credentials
   ```
   
   **Required environment variables:**
   - `SANITY_STUDIO_PROJECT_ID` - Your Sanity project ID
   - `SANITY_STUDIO_DATASET` - Dataset name (usually 'production')
   
   **Optional environment variables:**
   - `SANITY_STUDIO_API_VERSION` - API version (default: '2023-10-17')
   - `SANITY_STUDIO_BASE_PATH` - Base path for deployment (default: '/')
   - `SANITY_AUTH_TOKEN` - Authentication token for programmatic access
   - `NODE_ENV` - Environment mode (development/production)
   - `DEBUG` - Enable debug mode (true/false)

3. **Start development server:**
   ```bash
   pnpm dev
   ```

4. **Access the studio:**
   Open [http://localhost:3333](http://localhost:3333) in your browser.

## 🛠️ Development

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Check code with Biome
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format code with Biome

### Code Quality
This project uses:
- **[Biome](https://biomejs.dev/)** - Fast linter and formatter (replaces ESLint + Prettier)
- **[Lefthook](https://lefthook.dev/)** - Git hooks management
- **[Conventional Commits](https://conventionalcommits.org/)** - Standardized commit messages

### Git Workflow
Pre-commit hooks automatically:
- ✅ Format code with Biome
- ✅ Fix linting issues
- ✅ Type check with TypeScript
- ✅ Validate commit messages

See [COMMIT_CONVENTION.md](./COMMIT_CONVENTION.md) for commit message guidelines.

## 📚 Resources

- [Read "getting started" in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- Check out the example frontend: [React/Next.js](https://github.com/sanity-io/tutorial-sanity-blog-react-next)
- [Read the blog post about this template](https://www.sanity.io/blog/build-your-own-blog-with-sanity-and-next-js?utm_source=readme)
- [Join the Sanity community](https://www.sanity.io/community/join?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
