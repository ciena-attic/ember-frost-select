import FrostSelect from '../frost-select-2/component'
import layout from './template'
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

  actions: {
    onCheck (data) {
      console.log(data)
      console.log('ember sucks')
    },

    clearSelection () {
      this.set('selected', [])
      this.get('on-change')([])
    }
  }
})

export default FrostMultiSelect
