const imports = require('./configs/imports.js');
const javascript = require('./configs/javascript.js');
const typescript = require('./configs/typescript.js');

const plugin = {
  meta: {
    name: '@ngx-intersection/eslint-plugin',
    version: '0.0.0',
  },
  configs: {
    imports: imports.config,
    javascript: javascript.config,
    typescript: typescript.config,
  },
};

module.exports = plugin;
