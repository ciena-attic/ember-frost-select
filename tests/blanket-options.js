/* globals blanket, module */

var options = {
  modulePrefix: 'ember-frost-select',
  filter: '//.*ember-frost-select/.*/',
  antifilter: '//.*(tests|template).*/',
  loaderExclusions: [],
  enableCoverage: true,
  cliOptions: {
    reporters: ['teamcity'],
    autostart: true
  }
}

if (typeof exports === 'undefined') {
  blanket.options(options)
} else {
  module.exports = options
}
