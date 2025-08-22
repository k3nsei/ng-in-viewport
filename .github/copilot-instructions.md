# GitHub Copilot Instructions for ng-in-viewport

**Angular Development Guidelines**  
*Ignore current project patterns - use only latest Angular v20+ standards and best practices*

## Project Overview

This is an Angular library for viewport detection using modern Angular v20+ patterns. The repository contains:

- **Core library**: `projects/ng-in-viewport` - Signal-based viewport detection with Intersection Observer
- **Demo application**: `projects/demo` - Documentation and interactive examples
- **Example application**: `projects/example` - Real-world usage scenarios and performance testing
- **Test suites**: Comprehensive unit and E2E testing with modern Angular testing patterns

## Environment Setup

### Node.js Requirements

- **Required**: Node.js >=22.0.0 (LTS)
- **Required**: npm >=10.0.0
- **Package Manager**: Prefer `npm` with exact versions for consistency

### Dependency Installation

For restricted environments, use network workarounds:

```bash
CYPRESS_INSTALL_BINARY=0 npm ci
```

**Execution time**: ~15 seconds  
**Timeout**: Use 60+ seconds minimum, NEVER CANCEL

## Build Pipeline

### Complete Build Validation

```bash
npm run format && npm run lint && npm run build:lib && npm run test:lib
```

**Execution time**: ~45 seconds  
**Timeout**: Use 120+ seconds minimum, NEVER CANCEL

### Individual Commands

```bash
# Code Quality
npm run format          # Check formatting (5s)
npm run format:write    # Fix formatting (5s)
npm run lint           # Lint all projects (15s)

# Library Build
npm run build:lib      # Production build (20s)
npm run watch:lib      # Development watch mode

# Testing
npm run test:lib       # Unit tests with coverage (15s)
npm run e2e:run        # E2E tests headless (60s+)

# Development Servers
npm run serve:demo     # Demo app - localhost:4200
npm run serve:example  # Example app - localhost:4300
```

## Angular v20+ Development Standards

### Core Principles

**Signal-First Architecture**: Use signals as the primary state management pattern. Observables are reserved for streams and HTTP operations only.

**Component Design**: All components MUST be standalone with OnPush change detection and signal-based APIs.

**Template Syntax**: Exclusive use of modern control flow (`@if`, `@for`, `@switch`) and direct binding patterns.

### TypeScript Configuration

```typescript
// Use strict TypeScript with latest features
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**Type Standards**:
- NEVER use `any` - use `unknown` for uncertain types
- Use `satisfies` operator for type checking with inference
- Prefer `readonly` for all data that shouldn't be mutated
- Use template literal types for string constants

### Component Architecture

```typescript
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'viewport-element',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isInViewport()) {
      <div class="visible" [style.opacity]="opacity()">
        Content is visible ({{ visibilityRatio() }}%)
      </div>
    } @else {
      <div class="hidden">Content is hidden</div>
    }
  `,
  host: {
    '[attr.data-viewport-state]': 'viewportState()',
    '[class.in-viewport]': 'isInViewport()',
  },
})
export class ViewportElementComponent {
  // Signal inputs - primary pattern for v20+
  readonly threshold = input<number>(0.5);
  readonly rootMargin = input<string>('0px');
  readonly trackVisibility = input<boolean>(true);

  // Signal outputs - modern event handling
  readonly visibilityChange = output<{
    isVisible: boolean;
    entry: IntersectionObserverEntry;
  }>();

  // Dependency injection with inject()
  private readonly elementRef = inject(ElementRef);
  private readonly viewportService = inject(ViewportService);

  // Internal signals
  protected readonly isInViewport = signal<boolean>(false);
  protected readonly visibilityRatio = signal<number>(0);
  
  // Computed values - derived state
  protected readonly opacity = computed(() => 
    this.visibilityRatio() * 0.8 + 0.2
  );
  
  protected readonly viewportState = computed(() =>
    this.isInViewport() ? 'visible' : 'hidden'
  );

  constructor() {
    // Effects for side effects and reactions
    effect(() => {
      if (this.trackVisibility()) {
        this.setupViewportObserver();
      }
    });

    effect(() => {
      // Emit events when visibility changes
      this.visibilityChange.emit({
        isVisible: this.isInViewport(),
        entry: this.lastEntry(), // Reference to latest entry
      });
    });
  }

  private setupViewportObserver() {
    // Implementation with Intersection Observer
  }
}
```

### Service Design Patterns

```typescript
import { Injectable, inject, signal, computed } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ViewportService {
  private readonly document = inject(DOCUMENT);
  
  // Signal-based state management
  private readonly _elements = signal<Map<Element, ViewportConfig>>(new Map());
  private readonly _globalConfig = signal<ViewportGlobalConfig>({
    rootMargin: '0px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });

  // Public computed properties
  readonly trackedElementsCount = computed(() => this._elements().size);
  readonly isActive = computed(() => this.trackedElementsCount() > 0);

  // Modern intersection observer setup
  private observer?: IntersectionObserver;

  constructor() {
    this.initializeObserver();
  }

  // Public API methods
  observe(element: Element, config?: Partial<ViewportConfig>): () => void {
    const fullConfig = { ...this._globalConfig(), ...config };
    
    this._elements.update(elements => {
      const newElements = new Map(elements);
      newElements.set(element, fullConfig);
      return newElements;
    });

    this.observer?.observe(element);

    // Return cleanup function
    return () => this.unobserve(element);
  }

  unobserve(element: Element): void {
    this._elements.update(elements => {
      const newElements = new Map(elements);
      newElements.delete(element);
      return newElements;
    });

    this.observer?.unobserve(element);
  }

  private initializeObserver(): void {
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver not supported');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this._globalConfig()
    );
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    // Process intersection changes with signals
  }
}
```

### Template Best Practices

**Control Flow**: Exclusive use of Angular v20+ control flow syntax:

```html
<!-- Conditional rendering -->
@if (isLoading()) {
  <loading-spinner />
} @else if (hasError()) {
  <error-message [error]="error()" />
} @else {
  <content-display [data]="data()" />
}

<!-- Iteration -->
@for (item of items(); track item.id) {
  <item-card 
    [item]="item" 
    [index]="$index"
    [isLast]="$last"
    (action)="handleAction($event, item)" />
} @empty {
  <empty-state message="No items found" />
}

<!-- Switch statements -->
@switch (status()) {
  @case ('loading') { <loading-state /> }
  @case ('error') { <error-state [error]="error()" /> }
  @case ('success') { <success-state [data]="data()" /> }
  @default { <unknown-state /> }
}
```

**Binding Patterns**: Use direct property and class bindings:

```html
<!-- Property bindings -->
<div 
  [class.active]="isActive()"
  [class.disabled]="isDisabled()"
  [attr.aria-expanded]="isExpanded()"
  [style.opacity]="opacity()"
  [style.transform]="transform()">

<!-- Event bindings with proper typing -->
<button 
  (click)="handleClick($event)"
  (keydown.enter)="handleEnter()"
  (keydown.space)="handleSpace()">
  {{ buttonText() }}
</button>

<!-- Two-way binding with signals -->
<input [(ngModel)]="searchTerm" />
```

### Directive Patterns

```typescript
import { Directive, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[viewportObserver]',
  standalone: true,
  host: {
    '[attr.data-in-viewport]': 'isInViewport()',
  },
})
export class ViewportObserverDirective {
  // Signal inputs
  readonly threshold = input<number>(0.5);
  readonly rootMargin = input<string>('0px');

  // Injected dependencies
  private readonly elementRef = inject(ElementRef);
  private readonly viewportService = inject(ViewportService);

  // Internal state
  private readonly isInViewport = signal<boolean>(false);
  private cleanup?: () => void;

  constructor() {
    effect(() => {
      // Setup observer when inputs change
      this.setupObserver();
    });
  }

  ngOnDestroy(): void {
    this.cleanup?.();
  }

  private setupObserver(): void {
    this.cleanup?.();
    
    this.cleanup = this.viewportService.observe(
      this.elementRef.nativeElement,
      {
        threshold: this.threshold(),
        rootMargin: this.rootMargin(),
        callback: (isVisible) => this.isInViewport.set(isVisible),
      }
    );
  }
}
```

### Testing Patterns

**Component Testing**: Use Angular v20+ testing utilities with signals:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

describe('ViewportElementComponent', () => {
  let component: ViewportElementComponent;
  let fixture: ComponentFixture<ViewportElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewportElementComponent], // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ViewportElementComponent);
    component = fixture.componentInstance;
  });

  it('should emit visibility changes when signal updates', () => {
    const emitSpy = jest.spyOn(component.visibilityChange, 'emit');
    
    // Update signal directly
    fixture.componentRef.setInput('threshold', 0.8);
    fixture.detectChanges();
    
    expect(emitSpy).toHaveBeenCalledWith({
      isVisible: false,
      entry: expect.any(Object),
    });
  });

  it('should compute opacity based on visibility ratio', () => {
    // Test computed signals
    component['visibilityRatio'].set(0.5);
    expect(component['opacity']()).toBe(0.6); // 0.5 * 0.8 + 0.2
  });
});
```

**Service Testing**: Test signal-based services:

```typescript
import { TestBed } from '@angular/core/testing';
import { ViewportService } from './viewport.service';

describe('ViewportService', () => {
  let service: ViewportService;
  let mockElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewportService);
    mockElement = document.createElement('div');
  });

  it('should track elements correctly', () => {
    expect(service.trackedElementsCount()).toBe(0);
    
    const cleanup = service.observe(mockElement);
    expect(service.trackedElementsCount()).toBe(1);
    
    cleanup();
    expect(service.trackedElementsCount()).toBe(0);
  });
});
```

### Performance Optimization

**Signal Optimization**:
- Use `computed()` for derived state - automatically optimized
- Prefer `effect()` over manual subscriptions
- Use `untracked()` to break signal dependencies when needed

**Intersection Observer Optimization**:
```typescript
// Efficient observer configuration
private readonly observerConfig = computed(() => ({
  root: this.root(),
  rootMargin: this.rootMargin(),
  threshold: this.threshold(),
}));

// Single observer instance with signal-based config updates
effect(() => {
  this.updateObserverConfig(this.observerConfig());
});
```

**Memory Management**:
```typescript
// Automatic cleanup with effect cleanup
effect((onCleanup) => {
  const subscription = this.setupObserver();
  
  onCleanup(() => {
    subscription.unsubscribe();
  });
});
```

### Error Handling

```typescript
// Signal-based error handling
private readonly error = signal<Error | null>(null);
private readonly isLoading = signal<boolean>(false);

protected readonly hasError = computed(() => this.error() !== null);
protected readonly canRetry = computed(() => 
  this.hasError() && !this.isLoading()
);

async performOperation(): Promise<void> {
  this.isLoading.set(true);
  this.error.set(null);
  
  try {
    await this.operation();
  } catch (error) {
    this.error.set(error instanceof Error ? error : new Error(String(error)));
  } finally {
    this.isLoading.set(false);
  }
}
```

### Library-Specific Guidelines

**Public API Design**: Expose signal-based APIs for consumers:

```typescript
// Public API should use signals
export interface ViewportDetectionApi {
  readonly isInViewport: Signal<boolean>;
  readonly visibilityRatio: Signal<number>;
  readonly observe: (element: Element) => () => void;
}
```

**SSR Compatibility**: Always check platform and handle SSR:

```typescript
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';

constructor() {
  const platformId = inject(PLATFORM_ID);
  
  if (isPlatformBrowser(platformId)) {
    this.initializeObserver();
  }
}
```

### Migration Strategy

**From Angular 17 to v20+**:
1. Replace all `@Input()` with `input()`
2. Replace all `@Output()` with `output()`
3. Convert component state to signals
4. Update templates to use `@if`, `@for`, `@switch`
5. Replace observables with signals where appropriate
6. Use `computed()` for derived state
7. Replace manual subscriptions with `effect()`

**Breaking Changes to Expect**:
- Remove all structural directives (`*ngIf`, `*ngFor`)
- Remove `ngClass` and `ngStyle` - use direct bindings
- Remove `async` pipe for signals (not needed)
- Update event handling to use signal outputs

## Validation Requirements

### Manual Testing Protocol

1. **Demo App**: Verify all examples work with signal-based updates
2. **Example App**: Test performance with rapid viewport changes  
3. **Responsive Testing**: Validate across viewport sizes
4. **Memory Testing**: Check for leaks during rapid scroll/resize

### Automated Testing

```bash
npm run test:lib          # Unit tests with signal coverage
npm run e2e:run          # E2E tests with viewport scenarios
npm run test:performance # Performance regression tests
```

### Expected Behavior

- **Signal reactivity**: Immediate updates on viewport changes
- **Performance**: 60fps during scroll with hundreds of elements
- **Memory**: No leaks after component destruction
- **SSR**: Graceful degradation without browser APIs

## Troubleshooting

### Common Migration Issues

**Signal Conversion**: When updating to signals, ensure all dependencies are also signals or wrapped with signal access.

**Effect Dependencies**: Effects automatically track signal dependencies - use `untracked()` to break unwanted dependencies.

**Testing**: Signal-based tests require `fixture.detectChanges()` after signal updates.

### Performance Issues

**Too Many Effects**: Combine related effects or use `computed()` for derived state.

**Observer Thrashing**: Use debouncing for rapid viewport changes:

```typescript
// Debounced viewport updates
private readonly debouncedUpdate = computed(() => {
  const update = this.immediateUpdate();
  return debounce(update, 16); // ~60fps
});
```

This guide ensures all Angular v20+ development follows the latest standards and patterns, ignoring outdated practices from earlier versions.
