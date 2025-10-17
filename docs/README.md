# Documentation

This directory contains comprehensive documentation for the Alicja Maksymowicz Sanity Studio project.

## 📋 Documentation Structure

### Architecture Decision Records (ADRs)
📁 **[adr/](./adr/README.md)** - Architectural decisions made during development
- Documents the reasoning behind technical choices
- Provides context for future maintainers
- Tracks the evolution of the project architecture

### Setup and Development Guides
📄 **[development-setup.md](./development-setup.md)** - Complete development environment setup
📄 **[deployment-guide.md](./deployment-guide.md)** - Production deployment instructions
📄 **[troubleshooting.md](./troubleshooting.md)** - Common issues and solutions

## 🏗️ Architecture Overview

This project uses a modern development stack with the following key components:

### Core Technologies
- **Sanity Studio**: Headless CMS with real-time collaboration
- **TypeScript**: Type-safe JavaScript development
- **React**: UI library for the Sanity Studio interface
- **pnpm**: Fast, efficient package manager

### Development Tools
- **Biome**: Ultra-fast linting and formatting
- **Lefthook**: Git hooks for code quality automation
- **Conventional Commits**: Standardized commit message format

### CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Multi-workflow approach**: Separated concerns for better maintainability
- **Security scanning**: CodeQL and dependency vulnerability analysis

## 🚀 Quick Start

1. **Prerequisites**: Node.js 18+, pnpm
2. **Environment setup**: Copy `.env.example` to `.env`
3. **Installation**: `pnpm install`
4. **Development**: `pnpm dev`

For detailed setup instructions, see [development-setup.md](./development-setup.md).

## 📚 Key Documentation

### For Developers
- [ADR-001: Replace ESLint with Biome](./adr/001-replace-eslint-with-biome.md)
- [ADR-002: Adopt Lefthook for Git Hooks](./adr/002-adopt-lefthook-for-git-hooks.md)
- [ADR-003: Implement Conventional Commits](./adr/003-implement-conventional-commits.md)

### For DevOps/Deployment
- [ADR-005: GitHub Actions CI/CD Pipeline](./adr/005-github-actions-ci-cd-pipeline.md)
- [GitHub Actions Setup Guide](../.github/GITHUB_ACTIONS.md)
- [Deployment Guide](./deployment-guide.md)

### For Configuration Management
- [ADR-004: Centralize Environment Configuration](./adr/004-centralize-environment-configuration.md)
- [Environment Setup](./development-setup.md#environment-configuration)

## 🔧 Maintenance

### Adding New ADRs
When making significant architectural decisions:
1. Create a new ADR file using the template in [adr/README.md](./adr/README.md)
2. Update the ADR index
3. Reference the ADR in relevant documentation

### Documentation Updates
- Keep documentation in sync with code changes
- Update ADRs when decisions are superseded
- Review and update troubleshooting guides regularly

## 🤝 Contributing

When contributing to the project:
1. Read the relevant ADRs to understand architectural decisions
2. Follow the established patterns and conventions
3. Update documentation for any architectural changes
4. Add troubleshooting entries for new issues encountered

## 📞 Support

For questions about:
- **Architecture decisions**: Refer to relevant ADRs
- **Setup issues**: Check [troubleshooting.md](./troubleshooting.md)
- **Development workflow**: See [development-setup.md](./development-setup.md)
- **Deployment issues**: Check [deployment-guide.md](./deployment-guide.md)