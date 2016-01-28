/* jshint expr:true */
import { expect } from 'chai';
import { describeComponent, it } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'frost-select-2',
  'Integration: FrostSelect2Component',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-select-2}}
      //     template content
      //   {{/frost-select-2}}
      // `);
      expect(this.$()).to.have.length(1);
    });
  }
);

