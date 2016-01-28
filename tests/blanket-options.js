/* globals blanket, module */

var options = {
  modulePrefix: 'frost-select-2',
  filter: '//.*frost-select-2/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['teamcity'],
    autostart: true
  }
};

if (typeof exports === 'undefined') {
  blanket.options(options);
} else {
  module.exports = options;
}
