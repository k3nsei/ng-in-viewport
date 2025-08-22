# AI Agent Instructions for ng-in-viewport

## Project Overview

This is an Angular library for viewport detection using modern Angular v20+ patterns and signals. The library provides efficient viewport intersection detection using the Intersection Observer API.

### Repository Structure
- `projects/ng-in-viewport/` - Core library source code
- `projects/demo/` - Demo application for documentation
- `projects/example/` - Example application showing real-world usage
- `e2e/` - End-to-end tests
- `docs/` - Documentation files

## Development Guidelines

### Angular Standards
- Use Angular v20+ features exclusively (signals, modern control flow)
- All components must be standalone with OnPush change detection
- Use signal-based APIs and computed values
- Prefer `inject()` over constructor dependency injection
- Use modern template syntax (`@if`, `@for`, `@switch`)

### Code Quality
- TypeScript strict mode enabled
- ESLint and Prettier configured
- Jest for unit testing
- Playwright for E2E testing
- 100% code coverage expected for library code

### Key Commands
```bash
# Development
npm run build:lib        # Build library
npm run test:lib         # Test library
npm run lint             # Lint all projects
npm run format           # Check formatting
npm run serve:demo       # Run demo app (port 4200)
npm run serve:example    # Run example app (port 4300)

# Testing
npm run test             # All tests with coverage
npm run e2e:run          # E2E tests headless
npm run e2e:open         # E2E tests with UI
```

## Library Architecture

### Core Components
- `InViewportDirective` - Main directive for viewport detection
- `InViewportService` - Service managing intersection observers
- Signal-based state management throughout

### Key Features
- Intersection Observer API integration
- Signal-based reactivity
- SSR-compatible (graceful degradation)
- TypeScript first with strict typing
- Angular standalone components

## Testing Strategy

### Unit Tests
- Test all public APIs
- Mock Intersection Observer for browser compatibility
- Test signal reactivity and computed values
- Verify SSR compatibility

### E2E Tests
- Test real viewport interactions
- Verify performance with many elements
- Test responsive behavior
- Validate accessibility

## Performance Requirements
- Library bundle size < 10KB gzipped
- Zero runtime dependencies
- Efficient memory usage with proper cleanup
- 60fps performance during scroll operations

## Compatibility
- Angular 16+ (with standalone component support)
- Modern browsers with Intersection Observer
- Server-side rendering support
- TypeScript 5.0+

## Contributing Guidelines
- Follow conventional commits
- Ensure all tests pass
- Maintain code coverage
- Update documentation for API changes
- Use Angular best practices from latest version

## AI Assistant Context
When helping with this project:
1. Always use modern Angular patterns (v20+ features)
2. Prioritize performance and bundle size
3. Maintain TypeScript strict compliance
4. Ensure cross-browser compatibility
5. Test thoroughly with provided test suites
6. Follow the existing code patterns and architecture

## Common Tasks
- Adding new directive features
- Optimizing intersection observer performance
- Updating for new Angular versions
- Enhancing TypeScript definitions
- Improving test coverage
- Updating documentation examples