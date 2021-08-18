const { assert } = require('chai')
const Lottotron = require('../lib/Lottotron')
const indexExport = require('../index.js')

describe('index.js', () => {
  it('Should export Lottotron class.', () => {
    assert.strictEqual(indexExport, Lottotron)
  })
})