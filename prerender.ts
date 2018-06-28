import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

enableProdMode();

// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { renderModuleFactory } from '@angular/platform-server';
import { ROUTES } from './static.paths';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/in-viewport-server/main');

const BROWSER_FOLDER = join(process.cwd(), 'in-viewport');

const index = readFileSync(join('in-viewport', 'index.html'), 'utf8');

let previousRender = Promise.resolve();

ROUTES.forEach((route) => {
  const fullPath = join(BROWSER_FOLDER, route);

  if (!existsSync(fullPath)) {
    mkdirSync(fullPath);
  }

  previousRender = previousRender
    .then((_) =>
      renderModuleFactory(AppServerModuleNgFactory, {
        document: index,
        url: route,
        extraProviders: [provideModuleMap(LAZY_MODULE_MAP)]
      })
    )
    .then((html) => writeFileSync(join(fullPath, 'index.html'), html));
});
