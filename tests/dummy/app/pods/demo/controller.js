import Ember from 'ember';

export default Ember.Controller.extend({
  data: [
    {
      "value": "Lex Diamond",
      "label": "Raekwon the Chef"
    },
    {
      "value": "Johnny Blaze",
      "label": "Method Man"
    },
    {
      "value": "Tony Starks",
      "label": "Ghostface"
    },
    {
      "value": "Bobby Steels",
      "label": "The RZA"
    },
    {
      "value": "Noodles",
      "label": "Masta Killa"
    },
    {
      "value": "Golden Arms",
      "label": "U-God"
    },
    {
      "value": "Maximillion",
      "label": "GZA"
    },
    {
      "value": "Rollie Fingers",
      "label": "Inspectah Deck"
    },
    {
      "value": "Cappachino",
      "label": "Cappadonna"
    },
    {
      "value": "Osirus",
      "label": "Ol' Dirty Bastard"
    }
  ],
  actions: {
    onChange(values) {
      console.log(values);
    }
  }
});
