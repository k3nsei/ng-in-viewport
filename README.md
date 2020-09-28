# ng-in-viewport

[![npm][npm-badge-version]][npm-badge-url]
[![npm][npm-badge-license]][npm-badge-url]
[![npm][npm-badge-downloads]][npm-badge-url]

[![Dependency Status][david-badge]][david-badge-url]
[![peerDependency Status][david-peer-badge]][david-peer-badge-url]

[![CircleCI Status][circle-ci-badge]][circle-ci-badge-url]
[![GitHub Workflow][github-workflow-badge]][github-workflow-badge-url]
[![Build Status][azure-devops-badge]][azure-devops-badge-url]
[![Codecov Coverage][codecov-badge]][codecov-badge-url]
[![Codeclimate Coverage][codeclimate-coverage-badge]][codeclimate-coverage-badge-url]

![Maintainability][sonarcloud-badge]
[![Codacy Badge][codacy-badge]][codacy-badge-url]
[![Maintainability][codeclimate-maintainability-badge]][codeclimate-maintainability-badge-url]

Allows us to check if an element is within the browsers visual viewport

- 🤓 Learn about it on the [DOCS Site][lib-docs]
- 🚀 See it in action on [Stackblitz][example-app]
- 🎮 Play with it on [Stackblitz][example-app-embed]

## License

[MIT](https://github.com/k3nsei/angular2-in-viewport/blob/master/LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/k3nsei"><img src="https://avatars2.githubusercontent.com/u/190422?v=4" width="100px;" alt=""/><br /><sub><b>Piotr Stępniewski</b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/commits?author=k3nsei" title="Code">💻</a> <a href="https://github.com/k3nsei/ng-in-viewport/commits?author=k3nsei" title="Documentation">📖</a> <a href="https://github.com/k3nsei/ng-in-viewport/pulls?q=is%3Apr+reviewed-by%3Ak3nsei" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/k3nsei/ng-in-viewport/commits?author=k3nsei" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Bengejd"><img src="https://avatars3.githubusercontent.com/u/11723093?v=4" width="100px;" alt=""/><br /><sub><b>Jordan Benge</b></sub></a><br /><a href="#blog-Bengejd" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/numerized"><img src="https://avatars1.githubusercontent.com/u/166829?v=4" width="100px;" alt=""/><br /><sub><b>Kévin Perrée</b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/issues?q=author%3Anumerized" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/OzoTek"><img src="https://avatars3.githubusercontent.com/u/6436053?v=4" width="100px;" alt=""/><br /><sub><b>Alexandre Couret</b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/issues?q=author%3AOzoTek" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/anwar-elmawardy"><img src="https://avatars0.githubusercontent.com/u/23740710?v=4" width="100px;" alt=""/><br /><sub><b>anwar-elmawardy</b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/issues?q=author%3Aanwar-elmawardy" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/jwillebrands"><img src="https://avatars0.githubusercontent.com/u/8925?v=4" width="100px;" alt=""/><br /><sub><b>Jan-Willem Willebrands</b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/issues?q=author%3Ajwillebrands" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/CSchulz"><img src="https://avatars2.githubusercontent.com/u/1520593?v=4" width="100px;" alt=""/><br /><sub><b>CSchulz </b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/issues?q=author%3ACSchulz" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Silvest89"><img src="https://avatars2.githubusercontent.com/u/2388338?v=4" width="100px;" alt=""/><br /><sub><b>Johnnie Ho</b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/issues?q=author%3ASilvest89" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/pasevin"><img src="https://avatars2.githubusercontent.com/u/1058469?v=4" width="100px;" alt=""/><br /><sub><b>Aleksandr Pasevin</b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/commits?author=pasevin" title="Code">💻</a> <a href="https://github.com/k3nsei/ng-in-viewport/issues?q=author%3Apasevin" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/wkurniawan07"><img src="https://avatars2.githubusercontent.com/u/7261051?v=4" width="100px;" alt=""/><br /><sub><b>Wilson Kurniawan</b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/issues?q=author%3Awkurniawan07" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/basters"><img src="https://avatars0.githubusercontent.com/u/17099950?v=4" width="100px;" alt=""/><br /><sub><b>Eugene</b></sub></a><br /><a href="https://github.com/k3nsei/ng-in-viewport/commits?author=basters" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

<!-- DEFINITIONS -->

[circle-ci-badge]: https://img.shields.io/circleci/build/github/k3nsei/ng-in-viewport/master?logo=CircleCi&style=flat-square&token=1c961beeff7d2e03a4203efd1858081b9901caac
[circle-ci-badge-url]: https://circleci.com/gh/k3nsei/ng-in-viewport/tree/master
[azure-devops-badge]: https://img.shields.io/azure-devops/build/k3nsei/a2099adb-d5fb-4377-b950-042475976b1e/3?logo=Azure%20Pipelines&style=flat-square
[azure-devops-badge-url]: https://k3nsei.visualstudio.com/ng-in-viewport/_build/latest?definitionId=3
[github-workflow-badge]: https://img.shields.io/github/workflow/status/k3nsei/ng-in-viewport/Main?logo=GitHub&style=flat-square
[github-workflow-badge-url]: https://github.com/k3nsei/ng-in-viewport/actions?query=workflow%3AMain
[codeclimate-maintainability-badge]: https://img.shields.io/codeclimate/maintainability/k3nsei/ng-in-viewport?logo=Code%20Climate&style=flat-square
[codeclimate-maintainability-badge-url]: https://codeclimate.com/github/k3nsei/ng-in-viewport/maintainability
[codeclimate-coverage-badge]: https://img.shields.io/codeclimate/coverage/k3nsei/ng-in-viewport?logo=Code%20Climate&style=flat-square
[codeclimate-coverage-badge-url]: https://codeclimate.com/github/k3nsei/ng-in-viewport/test_coverage
[codacy-badge]: https://img.shields.io/codacy/grade/6fe02a88e70e4786a70ec2e94714794d?logo=codacy&style=flat-square
[codacy-badge-url]: https://www.codacy.com/manual/k3nsei/ng-in-viewport?utm_source=github.com&utm_medium=referral&utm_content=k3nsei/ng-in-viewport&utm_campaign=Badge_Grade
[codecov-badge]: https://img.shields.io/codecov/c/github/k3nsei/ng-in-viewport/develop?logo=codecov&style=flat-square
[codecov-badge-url]: https://codecov.io/gh/k3nsei/ng-in-viewport
[sonarcloud-badge]: https://img.shields.io/sonar/quality_gate/ng-in-viewport?logo=SonarCloud&server=https%3A%2F%2Fsonarcloud.io&style=flat-square
[david-badge]: https://img.shields.io/david/k3nsei/ng-in-viewport?logo=node.js&path=projects%2Fng-in-viewport&style=flat-square
[david-badge-url]: https://david-dm.org/k3nsei/ng-in-viewport/develop?path=projects/ng-in-viewport
[david-peer-badge]: https://img.shields.io/david/peer/k3nsei/ng-in-viewport?logo=node.js&path=projects%2Fng-in-viewport&style=flat-square
[david-peer-badge-url]: https://david-dm.org/k3nsei/ng-in-viewport/develop?type=peer&path=projects/ng-in-viewport
[npm-badge-version]: https://img.shields.io/npm/v/ng-in-viewport?style=flat-square
[npm-badge-license]: https://img.shields.io/npm/l/ng-in-viewport?style=flat-square
[npm-badge-downloads]: https://img.shields.io/npm/dm/ng-in-viewport?style=flat-square
[npm-badge-url]: https://www.npmjs.com/package/ng-in-viewport
[lib-docs]: https://k3nsei.gitbook.io/ng-in-viewport/
[example-app]: https://ng-in-viewport-example.stackblitz.io/
[example-app-embed]: https://stackblitz.com/edit/ng-in-viewport-example?embed=1&file=src/main.ts
