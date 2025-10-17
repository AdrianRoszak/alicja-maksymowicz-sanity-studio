# Development Setup Guide

This guide will help you set up the development environment for the Alicja Maksymowicz Sanity Studio project.

## 📋 Prerequisites

### Required Software
- **Node.js**: Version 18 or higher
- **pnpm**: Latest version (recommended package manager)
- **Git**: For version control
- **VS Code**: Recommended editor (optional)

### Install Prerequisites
```bash
# Install Node.js (via nvm - recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 22
nvm use 22

# Install pnpm
npm install -g pnpm

# Verify installations
node --version  # Should be 18+ 
pnpm --version  # Should show latest version
```

## 🚀 Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/AdrianRoszak/alicja-maksymowicz-sanity-studio.git
cd alicja-maksymowicz-sanity-studio
```

### 2. Environment Configuration
```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
# Required variables:
# - SANITY_STUDIO_PROJECT_ID=u1jpe37y
# - SANITY_STUDIO_DATASET=production
```

### 3. Install Dependencies
```bash
pnpm install
```

This will:
- Install all project dependencies
- Set up git hooks via Lefthook
- Configure the development environment

### 4. Start Development Server
```bash
pnpm dev
```

The Sanity Studio will be available at: http://localhost:3333

## 🔧 Environment Configuration

### Required Variables
Create a `.env` file with the following required variables:

```env
# Sanity Project Configuration
SANITY_STUDIO_PROJECT_ID=u1jpe37y
SANITY_STUDIO_DATASET=production

# API Configuration
SANITY_STUDIO_API_VERSION=2023-10-17
SANITY_STUDIO_BASE_PATH=/

# Local development settings
NODE_ENV=development
DEBUG=true
```

### Optional Variables
```env
# Authentication tokens (for CLI operations)
SANITY_AUTH_TOKEN=your_auth_token_here

# Database URLs (for future integrations)
DATABASE_URL=postgresql://user:password@localhost:5432/database

# Third-party service keys (as needed)
STRIPE_SECRET_KEY=sk_test_example_key
```

### Environment Files
- **`.env`**: Your local environment variables (git-ignored)
- **`.env.example`**: Template with example values (committed)
- **Never commit `.env`** to the repository

## 🛠️ Development Tools

### Available Scripts
```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Check code with Biome
pnpm lint:fix     # Fix linting issues automatically
pnpm format       # Format code with Biome

# Git & Commits
pnpm commitlint   # Validate commit messages

# Deployment
pnpm deploy       # Deploy to Sanity (requires auth)
```

### Git Workflow
The project uses automated git hooks:

#### Pre-commit Hook
Runs automatically before each commit:
- **Biome linting**: Checks and fixes code style
- **Type checking**: Validates TypeScript types
- **Auto-formatting**: Formats staged files

#### Commit Message Hook  
Validates commit messages follow [Conventional Commits](https://conventionalcommits.org/):
```bash
# Valid commit message format
feat: add new user authentication
fix: resolve login validation issue
docs: update API documentation
```

#### Pre-push Hook
Runs before pushing to remote:
- **Final lint check**: Ensures code quality
- **Build verification**: Checks if project builds successfully

### Code Quality Standards
- **Linting**: Biome with recommended rules
- **Formatting**: Biome with consistent style
- **Type Safety**: TypeScript with strict mode
- **Import Organization**: Automatic import sorting

## 🏗️ Project Structure

```
alicja-maksymowicz-sanity-studio/
├── .env.example              # Environment template
├── .gitignore               # Git ignore rules
├── biome.json              # Biome configuration
├── commitlint.config.js    # Commit message rules
├── lefthook.yml           # Git hooks configuration
├── package.json           # Dependencies and scripts
├── pnpm-lock.yaml         # Dependency lockfile
├── sanity.cli.ts          # Sanity CLI configuration
├── sanity.config.ts       # Sanity Studio configuration
├── tsconfig.json          # TypeScript configuration
├── lib/
│   └── env.ts             # Environment configuration
├── schemaTypes/           # Sanity schema definitions
│   ├── index.ts
│   ├── post.ts
│   ├── author.ts
│   └── category.ts
├── docs/                  # Documentation
│   └── adr/               # Architecture Decision Records
└── .github/
    └── workflows/         # GitHub Actions workflows
```

## 🎯 Development Best Practices

### Code Style
- Use TypeScript for all new code
- Follow the configured Biome rules
- Use meaningful variable and function names
- Add comments for complex business logic

### Git Workflow
1. Create feature branches from `develop`
2. Make small, focused commits
3. Use conventional commit messages
4. Open pull requests to `develop`
5. Merge to `main` only for releases

### Testing Strategy
- Manual testing in Sanity Studio
- Automated type checking via TypeScript
- Code quality validation via Biome
- Build verification in CI/CD

## 🐛 Troubleshooting

### Common Issues

#### pnpm Installation Issues
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Git Hooks Not Working
```bash
# Reinstall git hooks
pnpm lefthook install

# Check hook configuration
lefthook version
```

#### Environment Variables Not Loading
```bash
# Verify .env file exists
ls -la .env

# Check environment in development
pnpm dev
# Look for validation errors in console
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
pnpm tsc --noEmit

# Update TypeScript if needed
pnpm update typescript @types/react
```

### Getting Help
- Check the [troubleshooting guide](./troubleshooting.md)
- Review relevant [ADRs](./adr/README.md)
- Check GitHub Actions logs for CI issues
- Verify Sanity Studio configuration in browser console

## 🚀 Next Steps

After setup:
1. **Explore the Studio**: Visit http://localhost:3333
2. **Review the Schema**: Check `schemaTypes/` directory
3. **Read the ADRs**: Understand architectural decisions
4. **Make a Test Commit**: Verify git hooks work
5. **Try the Commands**: Test linting and formatting

For deployment setup, see [deployment-guide.md](./deployment-guide.md).