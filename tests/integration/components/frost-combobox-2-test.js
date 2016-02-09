
import { expect } from 'chai'
import { describeComponent, it } from 'ember-mocha'
import { beforeEach, afterEach } from 'mocha'
import sinon from 'sinon'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'

function wait (callback) {
  Ember.run.later(callback)
}

const testTemplate = hbs`{{frost-combobox-2 on-change=onChange data=data greeting=greeting}}`

describeComponent(
  'frost-combobox-2',
  'Integration: FrostCombobox2Component',
  {
    integration: true
  },
  function () {
    let sandbox
    let dropDown, props

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      props = {
        onChange: sinon.spy(),
        data: [
          {
            value: 'Lex Diamond'
          },
          {
            value: 'Johnny Blaze'
          },
          {
            value: 'Tony Starks'
          }
        ],
        greeting: 'Hola'
      }

      this.setProperties(props)

      this.render(testTemplate)
      dropDown = this.$('> div')
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('has correct initial state', function () {
      expect(dropDown).to.have.length(1)
    })
  })
