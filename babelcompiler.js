const Babel = require('babel-core');

const MockBrowser = require('mock-browser').mocks.MockBrowser;
const browser = new MockBrowser();

global.window = browser.getWindow();
global.window.localStorage = browser.getLocalStorage();
global.window.location = browser.getLocation();

global.localStorage = global.window.localStorage;
global.localStorage.removeItem = function(item) {
  this.setItem(item, undefined);
};

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
