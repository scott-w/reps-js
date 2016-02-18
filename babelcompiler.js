const _ = require('lodash');
const Babel = require('babel-core');

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const browser = new MockBrowser();

global.window = {
  localStorage: browser.getLocalStorage()
};

_.each(global.window, (value, key) => {
  global[key] = value;
});

module.exports = [{
  ext: '.js',
  transform: (content, filename) => {
    // Make sure to only transform your code or the dependencies you want
    if (filename.indexOf('node_modules') === -1) {
      const result = Babel.transform(content, {
        sourceMap: 'inline',
        filename: filename,
        sourceFileName: filename,
        presets: ['es2015']
      });
      return result.code;
    }

    return content;
  }
}];
