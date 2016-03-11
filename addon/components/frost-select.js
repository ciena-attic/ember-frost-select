import Ember from 'ember'
import layout from '../templates/components/frost-select'
import _ from 'lodash'

let FrostSelect = Ember.Component.extend({
  classNames: ['frost-select'],
  classNameBindings: ['focus', 'shouldOpen:open', 'error'],
  attributeBindings: ['tabIndex'],
  tabIndex: -1,
  hovered: -1,
  disabled: false,
  filter: undefined,
  layout,
  width: 200,
  maxListHeight: 400,

  style: Ember.computed('width', function () {
    return `width: ${this.get('width')}px`
  }),

  items: Ember.computed('data', function () {
    return this.get('data').map((item, index, list) => {
      return {
        label: item.label,
        value: item.value,
        index,
        classNames: ''
      }
    })
  }),

  error: Ember.computed('displayItems', function () {
    return this.get('displayItems').length === 0
  }),

  shouldOpen: Ember.computed('error', 'open', function () {
    return !this.get('error') && !this.get('shouldDisable') && this.get('open')
  }),

  shouldDisable: Ember.computed('error', 'disabled', function () {
    return this.get('error') || this.get('disabled')
  }),

  inputElement () {
    return this.$('input')
  },

  getLabel (item) {
    return item.label
  },

  prompt: Ember.computed('selected', function () {
    let selectedIndex = this.get('selected')
    let data = this.get('data')
    let filter = this.get('filter')
    let prompt = ''

    if (filter !== undefined) {
      prompt = filter
    } else {
      let selectedItem = data[selectedIndex[0]]
      if (selectedItem) {
        prompt = selectedItem.label
      }
    }
    return prompt
  }),

  getValues (selected = this.get('selected')) {
    return selected.map((selectedIndex) => {
      return this.get('data')[selectedIndex].value
    })
  },

  chooseHovered () {
    let displayItem = this.get('displayItems')[this.get('hovered')]
    this.select(displayItem.index)
  },

  getValid (filter) {
    let valid = []
    this.get('items').forEach((item, index, list) => {
      if (!filter || this.getLabel(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        valid.push({
          index,
          value: item.value,
          label: this.getLabel(item)
        })
      }
    })
    return valid
  },

  openList () {
    this.set('open', true)
  },

  closeList () {
    this.setProperties({open: false, filter: undefined, hovered: -1})
    this.inputElement().val(this.get('prompt'))
  },

  toggle (event) {
    event.preventDefault()
    if (this.get('shouldDisable')) {
      return
    }

    if (this.get('open')) {
      this.closeList()
      return
    }
    this.openList()
  },

  displayItems: Ember.computed('items', 'selected', 'hovered', 'filter', function () {
    let result = []
    let valid = this.getValid(this.get('filter'))

    valid.forEach((validItem, index, list) => {
      let className = ''
      if (this.get('selected').indexOf(validItem.index) !== -1) {
        className += ' selected'
        validItem.selected = true
      }

      if (index === this.get('hovered') || list.length === 1) {
        className += ' hover'
      }

      validItem.className = className
      result.push(validItem)
    })

    return result
  }),

  select (index) {
    let selected = [index]
    let values = this.getValues(selected)
    this.setProperties({
      selected: selected,
      open: false
    })
    this.set('filter', undefined)
    if (this.get('on-change') && _.isFunction(this.get('on-change'))) {
      this.get('on-change')(values)
    }
  },

  keyUp (event) {
    switch (event.which) {

      // escape key or tab key, close the dropdown
      case 27:
        if (this.get('open')) {
          this.toggle(event)
        }
        break

      // enter + spacebar, choose selected
      case 13:
        this.chooseHovered()
        break

      // up arrow
      case 38:
        event.preventDefault()
        this.hoverPrev()
        break

      // down arrow, open the dropdown if necessary, select next
      case 40:
        event.preventDefault()
        if (!this.get('open')) {
          this.openList()
        }
        this.hoverNext()
        break

      // backspace
      case 8:
        event.preventDefault()
        if (!this.get('open')) {
          this.openList()
        }
    }
  },

  hoverNext () {
    let hovered = this.get('hovered')
    if (hovered === this.get('displayItems').length - 1) {
      hovered = 0
    } else {
      hovered += 1
    }
    this.set('hovered', hovered)
  },

  hoverPrev () {
    let hovered = this.get('hovered')
    if (hovered === 0) {
      hovered = this.get('displayItems').length - 1
    } else {
      hovered -= 1
    }
    this.set('hovered', hovered)
  },

  search (term) {
    let valid = this.getValid(term)
    let newProps = {filter: term, hovered: -1}
    this.setProperties(newProps)
    if (valid.length === 1) {
      this.hoverNext()
    }
  },

  click (event) {
    // event.preventDefault()
  },

  actions: {

    onBlur (event) {
      this.set('focus', false)
    },

    onChange (event) {
      const target = event.currentTarget || event.target
      const onInput = this.get('on-input')
      if (_.isFunction(onInput)) {
        onInput(target.value)
      } else {
        this.search(target.value)
      }
    },

    onItemOver (event) {
      event.stopImmediatePropagation()
      let target = event.target
      let index = parseInt(target.getAttribute('data-index'), 10)
      this.set('hovered', index)
      return false
    },

    onFocus () {
      this.openList()
      this.set('focus', true)
      return false
    },

    onClickArrow (event) {
      this.toggle(event)
    },

    onSelect (event) {
      event.stopPropagation()
      let target = event.currentTarget || event.target
      let index = parseInt(target.getAttribute('data-index'), 10)
      this.select(index)
    }
  },
  selectOptionByValue (selectedValue) {
    // Find index
    let valueIndex = _.findIndex(this.get('items'), (item) => _.isEqual(item.value, selectedValue))

    if (valueIndex >= 0) { // Make sure we actually found the value
      this.select(valueIndex)
    }
  },
  didReceiveAttrs (attrs) {
    this._super(...arguments)
    function attrIsDifferent (newAttrs, oldAttrs, attributeName) {
      let oldValue = _.get(oldAttrs, attributeName + '.value')
      let newValue = _.get(newAttrs, attributeName + '.value')

      if (newValue && !_.isEqual(oldValue, newValue)) {
        return true
      }
      return false
    }

    if (attrIsDifferent(attrs.newAttrs, attrs.oldAttrs, 'selectedValue')) {
      this.selectOptionByValue(attrs.newAttrs.selectedValue.value)
    } else if (attrIsDifferent(attrs.newAttrs, attrs.oldAttrs, 'selected')) {
      let selected = this.get('selected')

      selected = selected && (_.isArray(selected) || _.isNumber(selected)) ? [].concat(selected) : []
      this.set('selected', selected)
    }
  },
  init () {
    this._super(...arguments)

    if (this.get('selected') === undefined) {
      this.set('selected', [])
    }
  }
})

export default FrostSelect
