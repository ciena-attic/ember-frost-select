import Ember from 'ember'
import layout from './template'
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
    return `width: ${this.get('width') }px`
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

  didInsertElement () {
    this.set('inputEl', this.$('input'))
  },

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

  toggle (event) {
    event.preventDefault()
    if (this.get('shouldDisable')) {
      return
    }

    if (this.get('open')) {
      this.setProperties({open: false, filter: undefined, hovered: -1})
      return
    }

    this.set('open', true)
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

  click () {
    this.inputEl.focus()
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
        this.hoverPrev()
        // this.scrollToHovered();
        break

      // down arrow, open the dropdown if necessary, select next
      case 40:
        if (!this.get('open')) {
          this.toggle(event)
        }
        this.hoverNext()
        // this.scrollToHovered();
        break

      // backspace
      case 8:
        if (!this.get('open')) {
          this.toggle(event)
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

  onBlur (event) {
    this.set('focus', false)
    this.toggle(event)
  },

  actions: {

    onBlur (event) {
      return true
    },

    onChange (event) {
      let target = event.currentTarget || event.target
      this.search(target.value)
    },

    onItemOver (event) {
      let target = event.target
      let index = parseInt(target.getAttribute('data-index'), 10)
      this.set('hovered', index)
    },

    onFocus (event) {
      this.set('focus', true)
      this.toggle(event)
    },

    onSelect (event) {
      event.stopPropagation()
      let target = event.currentTarget || event.target
      let index = parseInt(target.getAttribute('data-index'), 10)
      this.select(index)
    }
  },
  init () {
    this._super()
    this.set('selected', [])
  }

})

export default FrostSelect
