/* jshint expr:true */
import { expect } from 'chai'
import { describeComponent, it } from 'ember-mocha'
import { beforeEach, afterEach } from 'mocha'
import sinon from 'sinon'
import hbs from 'htmlbars-inline-precompile'
import wait from 'ember-test-helpers/wait'
import $ from 'jquery'
import _ from 'lodash'

const testTemplate = hbs`{{frost-select-2 onChange=onChange data=data greeting=greeting}}`

const keyCodes = {
  'up': 38,
  'down': 40,
  esc: 27
}

function keyUp($selection, keyCode) {
  if (_.isString(keyCode)) {
    keyCode = keyCodes[keyCode]
  }
  let event = $.Event('keyup')
  event.which = keyCode

  $selection.trigger(event)
}

describeComponent(
  'frost-select-2',
  'Integration: FrostSelect2Component',
  {
    integration: true
  },
  function () {
    let sandbox
    let props
    let dropDown

    beforeEach(function () {
      //sandbox = sinon.sandbox.create()
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
      dropDown = this.$('.frost-select')
    })

    it('renders', function () {
      expect(this.$('.frost-select')).to.have.length(1)
    })

    it('lists all passed data records', function () {
      expect(this.$('.frost-select li').length).to.eql(props.data.length)
    })

    it('opens when clicked', (done) => {
      this.$('.frost-select').click()
      wait().then(() => {
        expect(this.$('.frost-select').hasClass('open')).to.be.true
        done()
      })
    })

    it('opens when focused', function (done) {
      this.$('.frost-select input').focus()
      wait().then(function () {
        console.log(this.$('.frost-select').attr('class'))
        expect(this.$('.frost-select').hasClass('open')).to.be.true
        done()
      })
    })

    it('highlights list items on mouse over', function (done) {
      this.$('.frost-select').click()
      let listItem = this.$('.frost-select li:first-child')
      listItem.mouseover()
      wait().then(() => {
        // expect(true).to.eql(true)
        let listItem = this.$('.frost-select li:first-child')

        expect(listItem.hasClass('hover')).to.be.true
        done()
      })
    })

    it('highlights list items when down-arrowed to', function (done) {
      let dropDown = this.$('.frost-select')

      keyUp(dropDown, 'down')

      wait().then(() => {
        let listItem = this.$('.frost-select li:first-child')

        expect(listItem.hasClass('hover')).to.be.true
        done()
      })
    })


    it('highlights list items when up-arrowed to', function (done) {
      let dropDown = this.$('.frost-select')

      keyUp(dropDown, 'down')
      keyUp(dropDown, 'down')
      keyUp(dropDown, 'down')
      keyUp(dropDown, 'down')

      keyUp(dropDown, 'up')
      keyUp(dropDown, 'up')
      keyUp(dropDown, 'up')

      wait().then(() => {
        let listItem = this.$('.frost-select li:first-child')

        expect(listItem.hasClass('hover')).to.be.true
        done()
      })
    })

    it('closes when esc is pressed', function () {
      let dropDown = this.$('.frost-select')

      dropDown.click()
      keyUp(dropDown, 'esc')

      expect(dropDown.hasClass('open')).to.be.false
    })

    //   it('closes when blurred', () => {
    //     TestUtils.Simulate.keyUp(dropDownElement, {which: 27});
    //     expect(dropDownElement.className.indexOf('open')).to.eql(-1);
    //   })

    //   it('selects the hovered item when enter is pressed', () => {
    //     TestUtils.Simulate.keyUp(dropDownElement, {which: 40});
    //     TestUtils.Simulate.keyUp(dropDownElement, {which: 13});
    //     dropDown.state.selected = [props.data[0].value]
    //   })

    //   it('selects the hovered item when it is clicked', () => {
    //     let listItem = dropDownElement.getElementsByTagName('LI')[2];
    //     TestUtils.Simulate.click(listItem);
    //     dropDown.state.selected = [props.data[2].value]
    //   })

    //   it('filters the list when input is typed into', () => {
    //     let input = dropDownElement.getElementsByTagName('INPUT')[0];
    //     input.value = 'n';
    //     TestUtils.Simulate.change(input);
    //     let listItems = dropDownElement.getElementsByTagName('LI');
    //     expect(listItems.length).to.eql(2);
    //   })

    //   it('hovers the only available one if filter leaves one', () => {
    //     let input = dropDownElement.getElementsByTagName('INPUT')[0];
    //     input.value = 'm';
    //     TestUtils.Simulate.change(input);
    //     let listItem = dropDownElement.getElementsByTagName('LI')[0];
    //     expect(listItem.className.indexOf('hover')).not.to.eql(-1);
    //   })

    //   it('calls the supplied callback when an item is selected', () => {
    //     let listItem = dropDownElement.getElementsByTagName('LI')[2];
    //     TestUtils.Simulate.click(listItem);
    //     expect(props.onChange.calledOnce).to.eql(true);
    //   })

    //   it('goes into error state when something non-existant is typed', () => {
    //     TestUtils.Simulate.focus(dropDownElement);
    //     let input = dropDownElement.getElementsByTagName('INPUT')[0];
    //     input.value = 'zxcv';
    //     TestUtils.Simulate.change(input);
    //     expect(dropDownElement.className.indexOf('open')).to.eql(-1);
    //     expect(dropDownElement.className.indexOf('error')).not.to.eql(-1);
    //   })
    // })
  }
)
