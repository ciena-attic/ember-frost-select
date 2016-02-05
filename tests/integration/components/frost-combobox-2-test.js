
// import { expect } from 'chai'
// import { describeComponent, it } from 'ember-mocha'
// import { beforeEach, afterEach } from 'mocha'
// import sinon from 'sinon'
// import hbs from 'htmlbars-inline-precompile'

// const testTemplate = hbs`{{frost-combo-box-2 }}`

// describeComponent(
//   'frost-combobox-2',
//   'Integration: FrostCombobox2Component',
//   {
//     integration: true
//   },
//   function () {
//     let sandbox
//     let dropDown, props

//     beforeEach(() => {
//       sandbox = sinon.sandbox.create()
//       props = {
//         onChange: sinon.spy(),
//         data: [
//           {
//             value: 'Lex Diamond'
//           },
//           {
//             value: 'Johnny Blaze'
//           },
//           {
//             value: 'Tony Starks'
//           }
//         ],
//         greeting: 'Hola'
//       }

//       this.setProperties(props)

//       this.render(testTemplate)
//       dropDown = this.$()
//     })

//     afterEach(() => {
//       sandbox.restore()
//     })

//     it('has correct initial state', () => {
//       expect(dropDown).to.have.length(1)
//     })
//   })
