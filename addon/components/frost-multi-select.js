import FrostSelect from './frost-select'
import layout from '../templates/components/frost-multi-select'
import Ember from 'ember'
import _ from 'lodash'

let FrostMultiSelect = FrostSelect.extend({
  layout,
  classNames: ['frost-select', 'multi'],
  prompt: Ember.computed('selected', function () {
    let selected = this.get('selected')
    let filter = this.get('filter')
    let prompt = ''

    if (filter !== undefined) {
      prompt = filter
    } else if (selected.length < 3) {
      prompt = this.getLabels().join(', ')
    } else {
      prompt = `${selected.length} items selected`
    }

    return prompt
  }),

  getLabels () {
    return _.map(this.get('selected'), (selectedIndex) => {
      return this.get('data')[selectedIndex].label
    })
  },

  select (index) {
    let selected = this.get('selected')
    if (_.includes(selected, index)) {
      selected = _.without(selected, index)
      this.set('selected', selected)
    } else {
      selected.push(index)
      this.notifyPropertyChange('selected')
    }
    let values = this.getValues(selected)
    this.set('filter', undefined)
    if (this.get('on-change') && _.isFunction(this.get('on-change'))) {
      this.get('on-change')(values)
    }
  },

  disableInput: Ember.computed('selected', 'disabled', function () {
    let selected = this.get('selected')
    return this.get('disabled') || selected.length > 0
  }),

  search (term) {
    if (!this.get('disableInput')) {
      this._super(term)
    }
  },
  selectOptionByValue (selectedValue) {
    if (_.isUndefined(selectedValue)) {
      return
    }

    let items = this.get('items')

    if (!_.isArray(selectedValue)) {
      selectedValue = [selectedValue]
    }
    let selected = selectedValue.map(function (value) {
      return _.findIndex(items, (item) => _.isEqual(item.value, value))
    }).filter(function (value) {
      return value >= 0
    })
    this.set('selected', selected)
    let values = this.getValues(selected)
    this.set('filter', undefined)
    if (this.get('on-change') && _.isFunction(this.get('on-change'))) {
      this.get('on-change')(values)
    }
  },
  actions: {
    onCheck (data) {
      // stub for checkbox action
    },

    clearSelection () {
      this.set('selected', [])
      this.get('on-change')([])
    }
  }
})

export default FrostMultiSelect
