# GitHub Copilot Instructions for ng-in-viewport

This file provides comprehensive guidance for GitHub Copilot coding agents working in the ng-in-viewport repository.

## Repository Overview

This is an Angular library that allows checking if an element is within the browser's visual viewport. The repository contains:

- **Main library**: `projects/ng-in-viewport` - The core viewport detection library
- **Demo application**: `projects/demo` - Documentation and examples site
- **Example application**: `projects/example` - Interactive examples and playground
- **E2E tests**: `projects/demo-e2e` and `projects/example-e2e` - End-to-end testing suites

## Repository Setup

### Node.js Requirements

- **Required**: Node.js 18.x or >=20.10.0
- **Required**: npm >=10.0.0
- **Recommended**: Use Volta configuration (Node 20.11.1, npm 10.4.0)

### Dependency Installation

**ALWAYS** use the network workaround for Cypress in restricted environments:

```bash
CYPRESS_INSTALL_BINARY=0 npm ci
```

**Execution time**: ~15 seconds  
**Timeout recommendation**: Use 60+ seconds minimum, NEVER CANCEL

This command installs all dependencies while skipping Cypress binary download that may be blocked by network restrictions.

## Build Processes

### Core Build Pipeline

Run the complete build and validation pipeline:

```bash
npm run format && npm run lint && npm run build:lib && npm run test:lib
```

**Execution time**: ~45 seconds total  
**Timeout recommendation**: Use 120+ seconds minimum, NEVER CANCEL

### Individual Build Commands

#### Formatting and Linting

```bash
npm run format        # Check code formatting (5 seconds)
npm run format:write  # Fix code formatting (5 seconds)
npm run lint         # Lint all projects (15 seconds)
npm run lint:lib     # Lint library only (8 seconds)
npm run lint:demo    # Lint demo app only (8 seconds)
npm run lint:example # Lint example app only (8 seconds)
```

#### Library Build

```bash
npm run build:lib    # Build ng-in-viewport library (20 seconds)
```

#### Application Builds

```bash
npm run build:demo    # Build demo app for production (25 seconds)
npm run build:example # Build example app for production (30 seconds)
```

**WARNING**: `npm run build:example` may fail with Google Fonts download issues in restricted environments. This is expected and does not indicate a problem with your code changes.

#### Watch Mode Builds

```bash
npm run watch:lib     # Watch and rebuild library
npm run watch:demo    # Watch and rebuild demo app
npm run watch:example # Watch and rebuild example app
```

## Testing Workflows

### Unit Testing

```bash
npm run test         # Run all unit tests with coverage (25 seconds)
npm run test:lib     # Test library only (15 seconds)
npm run test:demo    # Test demo app only (10 seconds)
npm run test:example # Test example app only (10 seconds)
```

**Timeout recommendation**: Use 90+ seconds minimum, NEVER CANCEL

### E2E Testing

```bash
npm run e2e:run:demo    # Run demo E2E tests headlessly (60+ seconds)
npm run e2e:run:example # Run example E2E tests headlessly (60+ seconds)
npm run e2e:open:demo   # Open demo E2E tests interactively
npm run e2e:open:example # Open example E2E tests interactively
```

**Timeout recommendation**: Use 180+ seconds minimum, NEVER CANCEL  
**Note**: E2E tests may fail in headless environments. Use manual validation instead.

## Development Workflows

### Serving Applications

```bash
npm run serve:demo    # Serve demo app at http://localhost:4200
npm run serve:example # Serve example app at http://localhost:4300
```

**Execution time**: ~10 seconds to start  
**Usage**: Keep running for development and manual testing

### Library Development Workflow

1. Make changes to library code in `projects/ng-in-viewport/src/`
2. Build library: `npm run build:lib`
3. Test changes: `npm run test:lib`
4. Validate in demo app: `npm run serve:demo`
5. Validate in example app: `npm run serve:example`

### Code Quality Workflow

1. Format code: `npm run format:write`
2. Lint code: `npm run lint`
3. Build library: `npm run build:lib`
4. Run tests: `npm run test:lib`

## Manual Validation Requirements

After making changes to viewport detection functionality, ALWAYS perform manual validation:

### Demo App Validation (http://localhost:4200)

1. Run `npm run serve:demo`
2. Navigate through the documentation sections
3. Verify viewport detection examples work correctly
4. Test responsive behavior at different screen sizes

### Example App Validation (http://localhost:4300)

1. Run `npm run serve:example`
2. Scroll through the numbered elements (1-20)
3. Verify that elements change appearance when entering/leaving viewport
4. Test with different viewport threshold settings
5. Verify callback functions are triggered correctly

### Expected Behavior

- Elements should visually indicate when they enter the viewport
- Elements should update their state when leaving the viewport
- Threshold settings should affect when detection triggers
- Performance should remain smooth during scrolling

## CI Pipeline Compatibility

The repository uses GitHub Actions for CI/CD. Ensure your changes are compatible with:

- **Formatting check**: `npm run format`
- **Linting**: `npm run lint`
- **Library build**: `npm run build:lib`
- **Unit tests**: `npm run test:lib`
- **E2E tests**: May be skipped in CI due to environment restrictions

## Troubleshooting

### Common Issues and Solutions

#### Cypress Installation Fails

**Error**: `download.cypress.io` blocked or timeout
**Solution**: Use `CYPRESS_INSTALL_BINARY=0 npm ci` instead of `npm install`

#### Google Fonts Download Fails

**Error**: `fonts.googleapis.com` blocked during `npm run build:example`
**Solution**: This is expected in restricted environments. The build failure does not indicate a problem with your code.

#### Tests Time Out

**Error**: Jest or npm commands time out
**Solution**: Increase timeout to 120+ seconds minimum. NEVER CANCEL running tests.

#### Port Already in Use

**Error**: Port 4200 or 4300 already in use
**Solution**: Kill existing processes or use different ports with `ng serve --port=XXXX`

#### Build Artifacts Conflict

**Error**: Unexpected build errors after changes
**Solution**: Clear build cache and rebuild:

```bash
rm -rf dist/
npm run build:lib
```

### Network Restrictions

This repository is designed to work in restricted network environments:

- Cypress binary installation is skipped
- Google Fonts download failures are expected
- All core functionality works without external network access

### Memory Issues

If you encounter memory issues during builds or tests:

- Increase Node.js memory limit: `export NODE_OPTIONS="--max-old-space-size=4096"`
- Run operations individually instead of chained commands

## File Structure Guidelines

### Library Code (`projects/ng-in-viewport/src/`)

- **Core logic**: `lib/` directory
- **Public API**: `public-api.ts`
- **Tests**: `.spec.ts` files alongside source files

### Demo App (`projects/demo/src/`)

- **Components**: Demonstrate library usage
- **Routing**: Navigate between examples
- **Styles**: Visual presentation of examples

### Example App (`projects/example/src/`)

- **Interactive examples**: Real-world usage scenarios
- **Configuration options**: Demonstrate different settings
- **Performance testing**: Stress test viewport detection

## Code Standards

### TypeScript

- Use strict TypeScript configuration
- Provide explicit type annotations for public APIs
- Follow Angular coding style guide

### Testing

- Write unit tests for all public API methods
- Test edge cases and error conditions
- Maintain high code coverage (>90%)

### Documentation

- Update README.md for API changes
- Add JSDoc comments for public methods
- Include usage examples for new features

## Performance Considerations

### Viewport Detection

- Minimize DOM queries and measurements
- Use efficient event listeners
- Implement proper cleanup in component destruction
- Consider using Intersection Observer API when available

### Memory Management

- Unsubscribe from observables in ngOnDestroy
- Remove event listeners when components are destroyed
- Avoid memory leaks in long-running applications

## Angular Development Guidelines

### Persona and Context

You are an Angular developer working on this viewport detection library. This project uses **Angular 17** with modern practices including standalone components, the inject() function, and Intersection Observer API for performance.

### Angular Best Practices for This Project

#### TypeScript Standards

- Use strict type checking (already configured)
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Provide explicit type annotations for public APIs

#### Component Guidelines

- **Always use standalone components** - this library already follows this pattern
- **DO NOT set `standalone: true`** in decorators (it's the default in modern Angular)
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Keep components small and focused on single responsibility
- Use `input()` and `output()` functions instead of `@Input()` and `@Output()` decorators when adding new features
- Use `computed()` for derived state when working with signals
- Use the `inject()` function instead of constructor injection (already implemented)

#### Template Best Practices

- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch` for new code
- DO NOT use `ngClass`, use `class` bindings instead
- DO NOT use `ngStyle`, use `style` bindings instead
- Keep templates simple and avoid complex logic
- Use the async pipe to handle observables

#### State Management

- Use signals for local component state when adding new features
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- DO NOT use `mutate` on signals, use `update` or `set` instead

#### Service and Directive Guidelines

- Design services around single responsibility (InViewportService follows this)
- Use `providedIn: 'root'` for singleton services
- Put host bindings inside the `host` object of decorators instead of `@HostBinding`/`@HostListener`

#### Library-Specific Considerations

- **Intersection Observer API**: This library uses Intersection Observer for performance-critical viewport detection
- **Platform checks**: Always use `isPlatformBrowser()` before DOM operations for SSR compatibility
- **Memory management**: Implement proper cleanup in `ngOnDestroy` - unsubscribe from observables and remove event listeners
- **Performance**: Minimize DOM queries and use efficient event handling patterns

#### Code Examples for This Project

Modern Angular component structure:

```typescript
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';

@Component({
  selector: 'custom-element',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isVisible()) {
      <span>Element is in viewport</span>
    } @else {
      <span>Element is not visible</span>
    }
  `,
})
export class CustomComponent {
  // Use signal inputs for new features
  readonly threshold = input<number>(0.5);

  // Use output functions for new features
  readonly visibilityChange = output<boolean>();

  // Use inject() function
  private readonly elementRef = inject(ElementRef);
}
```

#### Modernization Guidelines

When updating existing code in this library:

- **Gradual migration**: Don't break existing decorator-based inputs/outputs without good reason
- **New features**: Use modern signal-based APIs for new components and directives
- **Maintain compatibility**: Ensure changes don't break public API for library consumers
- **Test thoroughly**: Viewport detection is performance-critical, validate with manual testing

#### Angular Style Guide References

- [Official Angular Style Guide](https://angular.dev/style-guide)
- [Angular Essentials - Components](https://angular.dev/essentials/components)
- [Angular Essentials - Signals](https://angular.dev/essentials/signals)
- [Angular Essentials - Templates](https://angular.dev/essentials/templates)
- [Angular Essentials - Dependency Injection](https://angular.dev/essentials/dependency-injection)

This documentation ensures that any GitHub Copilot agent can work effectively in this codebase with clear, actionable guidance and no ambiguity about build processes or validation requirements.
