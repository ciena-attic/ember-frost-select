/* jshint expr:true */
import { expect } from 'chai'
import { describeComponent, it } from 'ember-mocha'
import { beforeEach } from 'mocha'
import sinon from 'sinon'
import hbs from 'htmlbars-inline-precompile'
import $ from 'jquery'
import _ from 'lodash'
import Ember from 'ember'

function wait (callback) {
  Ember.run.later(callback)
}

const testTemplate = hbs`{{frost-multi-select-2 on-change=onChange data=data greeting=greeting}}`

const keyCodes = {
  'up': 38,
  'down': 40,
  esc: 27
}

function keyUp ($selection, keyCode) {
  if (_.isString(keyCode)) {
    keyCode = keyCodes[keyCode]
  }
  let event = $.Event('keyup')
  event.which = keyCode

  $selection.trigger(event)
}

describeComponent(
  'frost-multi-select-2',
  'Integration: FrostMultiSelect2Component',
  {
    integration: true
  },
  function () {
    let sandbox
    let props
    let dropDown

    beforeEach(function () {
      // sandbox = sinon.sandbox.create()
      props = {
        onChange: sinon.spy(),
        data: [
          {
            value: 'Lex Diamond',
            label: 'Raekwon'
          },
          {
            value: 'Johnny Blaze',
            label: 'Method Man'
          },
          {
            value: 'Tony Starks',
            label: 'Ghostface'
          }
        ],
        greeting: 'Hola'
      }

      this.setProperties(props)

      this.render(testTemplate)
      dropDown = this.$('.frost-select')
    })

    it('renders', function () {
      expect(this.$('.frost-select')).to.have.length(1)
    })

    it('allows for multiple values to be selected', function (done) {
      this.$('li:nth-child(2)').click()
      this.$('li:nth-child(3)').click()
      wait(() => {
        let values = props.onChange.lastCall.args[0]

        expect(values).to.eql(['Johnny Blaze', 'Tony Starks'])
        done()
      })
    })

    it('removes values from the list', function (done) {
      this.$('li:nth-child(2)').click()
      this.$('li:nth-child(3)').click()

      // TODO: click remove item
      wait(() => {
        let values = props.onChange.lastCall.args[0]

        expect(values).to.eql(['Johnny Blaze'])

        done()
      })
    })
  }
)
