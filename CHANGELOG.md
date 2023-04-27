# Changelog

## [15.0.2](https://github.com/k3nsei/ng-in-viewport/compare/v15.0.1...v15.0.2) (2023-04-27)


### Features

* enable npm package provenance ([ce13c14](https://github.com/k3nsei/ng-in-viewport/commit/ce13c146996baa26cc621fa4cda2d2b5854c1064))

## [15.0.1](https://github.com/k3nsei/ng-in-viewport/compare/v15.0.0...v15.0.1) (2023-02-22)

### Bug Fixes

- emit event inside NgZone ([72ff720](https://github.com/k3nsei/ng-in-viewport/commit/72ff720ee4b7dd9c705e5ce6fe3d9538e610aef9)), closes [#1284](https://github.com/k3nsei/ng-in-viewport/issues/1284)

## [15.0.0](https://github.com/k3nsei/ng-in-viewport/compare/v13.0.1...v15.0.0) (2023-01-30)

### Enhancements

- Library was rewritten from scratch with usage of new standalone APIs that comes in `Angular v14.0.0`
- Unit test coverage is now 100%

### Bug Fixes

- Use `globalThis.btoa` for platform browser and server as `node.js` implemented it (#1274)(8b1fc918ac6e463afdd736324e19dd4a5c3a3e34)
- Use `WeakMap` and generated unique id to reference `checkFn` (#1055)(8b1fc918ac6e463afdd736324e19dd4a5c3a3e34)

### Breaking Changes

With this release support for Angular lower than `v14.0.0` is dropped for those please use `ng-in-viewport` `v6.1.5` or `v13.0.1`

## [13.0.1](https://github.com/k3nsei/ng-in-viewport/compare/v13.0.0...v13.0.1) (2022-02-14)

**Note: This version is re-release of v13.0.0 with a corrected peer dependencies list. NX workspace added dependencies from unit tests, which was source of an issue.**

There were no changes in code, library was compiled with ivy in mind because Angular 13 is no longer supports view engine.

### Breaking Changes

With this version support for versions of angular lower than 12 is dropped for those please use ng-in-viewport v6.1.5

## [13.0.0](https://github.com/k3nsei/ng-in-viewport/compare/v6.1.5...v13.0.0) (2022-02-07)

There were no changes in code, library was compiled with ivy in mind because Angular 13 is no longer supports view engine.

### Breaking Changes

- With this version support for versions of angular lower than 12 is dropped for those please use **ng-in-viewport v6.1.5**

## [6.1.5](https://github.com/k3nsei/ng-in-viewport/compare/v6.1.4...v6.1.5) (2021-01-22)

### Enhancement

- Update readme

## [6.1.4](https://github.com/k3nsei/ng-in-viewport/compare/v6.1.3...v6.1.4) (2020-11-03)

### Bug Fixes

- Make options input public (#360)(42d460029dc88bceb1ff4d01e98691ccdb2706b0)

## [6.1.3](https://github.com/k3nsei/ng-in-viewport/compare/v6.1.1...v6.1.3) (2020-08-09)

### Bug Fixes

- Drop usage of Function constructor (#333)(2db638c0a0c767345984b21bf94da2e91cb8e3a8)

## [6.1.1](https://github.com/k3nsei/ng-in-viewport/compare/v6.1.0...v6.1.1) (2020-07-02)

### Bug Fixes

- Broken support of server platform in config (#316)(53ed86b6cb30fa60336f8560efc182e536f83ede)

## [6.1.0](https://github.com/k3nsei/ng-in-viewport/compare/v6.0.3...v6.1.0) (2020-04-14)

### Enhancement

- Support root with many options (#147)(22672d6c01322f190706093c24a184a39049256d)

## [6.0.3](https://github.com/k3nsei/ng-in-viewport/compare/v6.0.2...v6.0.3) (2018-11-05)

### Enhancement

- Use better predicate for completelyVisible (#101)(e5c6363ead40638619304d1ce6fdcf8caeda8cfa)

## [6.0.2](https://github.com/k3nsei/ng-in-viewport/compare/v6.0.1...v6.0.2) (2018-07-17)

### Enhancement

- Fix "similar-code" issue in projects/ng-in-viewport/src/lib/in-viewport.directive.ts (#53)(eeb4e27a8b77f027572e4161b6f06c400b729ca1)

## [6.0.1](https://github.com/k3nsei/ng-in-viewport/compare/v6.0.0...v6.0.1) (2018-06-30)

### Bug Fixes

- Changed dependency semver ranges

## [6.0.0](https://github.com/k3nsei/ng-in-viewport/compare/v1.2.8...v6.0.0) (2018-06-28)

### Upgrade to Angular 6

- Optimization and refactoring
- Change dependencies to require Angular 6 or newer
- Change dependencies to require RxJS 6 or newer

### Breaking Changes

- (inViewportAction) output has changed. Now there is `visible` property instead of `value`.

## [1.2.8](https://github.com/k3nsei/ng-in-viewport/compare/v1.2.7...v1.2.8) (2018-06-08)

### Enhancement:

- Build with typescript v2.6.2 (#42)(d0008a2084029da59e4383fa50dcba70b8b31966)

### Bug Fixes:

- Fix platform-server support (#12)(d0008a2084029da59e4383fa50dcba70b8b31966)

## [1.2.7](https://github.com/k3nsei/ng-in-viewport/compare/v1.2.5...v1.2.7) (2018-05-25)

### Enhancement:

- Add platform-server support (#12)(5241efb2304af0b64eca6d610b3c1813bffb865d 69fb3c25815ee7991f32f7967325ac4d9bf4879e)

## [1.2.5](https://github.com/k3nsei/ng-in-viewport/compare/v1.2.0...v1.2.5) (2018-05-23)

### Bug Fixes:

- Run IntersectionObserver outside angular zone (#39)(a340fa4e862f374be5a10558f458279ab0f2aea5)

## [1.2.0](https://github.com/k3nsei/ng-in-viewport/compare/v1.1.3...v1.2.0) (2017-04-10)

- Use ES5 and ES2015 modules with AOT support
- Use `intersection-observer` polyfill and drop strategies
- Support for rootElement

## [1.1.3](https://github.com/k3nsei/ng-in-viewport/compare/v1.1.2...v1.1.3) (2017-03-28)

- Fire init check after view init

## [1.1.2](https://github.com/k3nsei/ng-in-viewport/compare/v1.1.1...v1.1.2) (2017-03-25)

- Do not modifies Observable prototype

## [1.1.1](https://github.com/k3nsei/ng-in-viewport/compare/v1.1.0...v1.1.1) (2017-03-25)

- Add docs and github-page

## [1.1.0](https://github.com/k3nsei/ng-in-viewport/compare/v1.0.0...v1.1.0) (2017-03-25)

## [1.0.0](https://github.com/k3nsei/ng-in-viewport/tree/v1.0.0) (2017-02-10)

- Optimize listening scroll and resize events
- Create Module
