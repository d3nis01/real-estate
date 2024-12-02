module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-opera-launcher'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: require('path').join(__dirname, 'coverage'),
      reporters: [{ type: 'html', subdir: 'html' }, { type: 'text-summary' }, { type: 'lcov', subdir: 'lcov' }, { type: 'json', subdir: '.', file: 'coverage.json' }],
    },
    browsers: ['Chrome', 'Opera'],
    singleRun: false,
    restartOnFileChange: true,
  });
};
