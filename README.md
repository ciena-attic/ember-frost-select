[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-select.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-select

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-select.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-select

[npm-img]: https://img.shields.io/npm/v/ember-frost-select.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-select

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

# ember-frost-select
the drop-down select widget to rule them all

 * [Installation](#Installation)
 * [API](#API)
 * [Examples](#Examples)
 * [Contributing](#Contributing)

## Installation
```
ember install ember-frost-select
```

## API
| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| `data` | `array` | `[{"label: "foo", "value": "bar"}]` |  An array of "label"/"value" key/value pairs representing the rows in the select drop-down. |
| `on-change` | `string` | `<action-name>` | The action callback to call when the value of the select component changes |

## Examples
Assuming the following data is available in the consuming context:
```
data = [
  {
    "label": "foo",
    "value": "bar"
  },
  {
    "label": "fizz",
    "value": "buzz"
  }
]
``` 

### Simple single select
```
{{frost-select
  data=data
  on-change=(action 'yourCallbackAction')
}}}
```

### Multi select
```
{{frost-multi-select
  data=data
  on-change=(action 'yourCallbackAction')
}}}
```

##Contributing
This following outlines the details of collaborating on this Ember addon:

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
