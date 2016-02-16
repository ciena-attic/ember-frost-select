import Ember from 'ember'

export default Ember.Controller.extend({
  data: [
    {
      'value': 'Clark Kent',
      'label': 'Superman'
    },
    {
      'value': 'Bruce Wayne',
      'label': 'Batman'
    },
    {
      'value': 'Tony Starks',
      'label': 'Ironman'
    },
    {
      'value': 'Princess Diana',
      'label': 'Wonder Woman'
    },
    {
      'value': 'Barry Allen',
      'label': 'The Flash'
    },
    {
      'value': 'Arthur Curry',
      'label': 'Aquaman'
    },
    {
      'value': 'Hal Jordan',
      'label': 'Green Lantern'
    },
    {
      'value': 'Adam Meadows',
      'label': 'Atom'
    },
    {
      'value': 'Jaime Reyes',
      'label': 'Blue Beetle'
    },
    {
      'value': 'Leonard Snart',
      'label': "Captain Cold"
    }
  ],
  actions: {
    onChange (values) {
      console.log(values)
    }
  }
})
