import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { beforeEach, vi } from 'vitest';
import 'vitest-dom/extend-expect';

import '../../test-setup/global-mocks';

// Make vi available globally like jest was
Object.assign(globalThis, { jest: vi });

beforeEach(() => {
  getTestBed().resetTestEnvironment();
  getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
});
