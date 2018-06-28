const config = require('./protractor.conf').config;

config.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--no-sandbox', '--headless', '--disable-gpu', '--no-sandbox', '--window-size=800,600']
  }
};

exports.config = config;
