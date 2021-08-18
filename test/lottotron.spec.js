const assert = require('chai').assert

const Lottotron = require('../lib/Lottotron')
const LottotronError = require('../lib/LottotronError')

const arrayOfTypes = [
  'string',
  null,
  undefined,
  [],
  {},
  () => {},

  /* number */
  1,
  -1,
  1.3,
  -1.4,
  +Infinity,
  -Infinity,
  NaN
]

const {
  MAX_IS_NOT_NUMBER,
  MAX_LOWER_ZERO,
  MAX_IS_NON_FINITE
} = LottotronError.REASON_

const isNumber = (value) => typeof(value) === 'number'

const getNaturalNumbersTo = (maxNumber) => {
  let array = []
  for (let i = 0; i <= maxNumber; i++) array.push(i)
  return array
}

describe('class Lottotron', () => {
  describe('constructor(max)', () => {
    it('Should throw an error if the "max" option is not a number.',
      () => arrayOfTypes.forEach((typeValue) => {
        if (isNumber(typeValue)) return

        assert.throws(
          () => new Lottotron(typeValue),
          LottotronError,
          MAX_IS_NOT_NUMBER
        )
      })
    )

    it(`Should throw an error if the "max" option is a non-finite number.`,
      () => arrayOfTypes.forEach((typeValue) => {
        if (!isNumber(typeValue)) return
        if (Number.isFinite(typeValue)) return

        assert.throws(
          () => new Lottotron(typeValue),
          LottotronError,
          MAX_IS_NON_FINITE
        )
      })
    )

    it('Should throw an error if the "max" option less than 0.',
      () => {
        assert.throws(
          () => new Lottotron(-5),
          LottotronError,
          MAX_LOWER_ZERO
        )
      }
    )

    it('Should return a Lottotron instance if the "max" option has a correct value.',
      () => assert.instanceOf(new Lottotron(3), Lottotron)
    )
  })

  describe('#max', () => {
    it(`Should be a positive integer`,
      () => {
        const { max } = new Lottotron(3.6)
        assert(Number.isInteger(max))
      }
    )

    it(`Should be equal to the "max" constructor option if one passed with integer value.`,
      () => {
        const value = 5
        const { max } = new Lottotron(value)
        assert.strictEqual(max, value)
      }
    )

    it(`Should be equal the rounded down "max" constructor option if one passed with a float value.`,
      () => {
        const value = 93.4
        const flooredValue = Math.floor(value)
        const { max } = new Lottotron(value)
        assert.strictEqual(max, flooredValue)
      }
    )

    it('Should be a read-only property.',
      () => {
        const initalValue = 3
        const lotto = new Lottotron(initalValue)
        lotto.max = 7
        assert.equal(lotto.max, initalValue)
      }
    )
  })

  describe('#next()', () => {
    it(`Should return all numbers of the interval in (max + 1) method calls.`,
      () => {
        const lotto = new Lottotron(8)
        const { max } = lotto

        assert(
          Array(max + 1).fill(null)
            .map(() => lotto.next())
            .every((number, index, numberList) => numberList.includes(index))
        )
      }
    )

    it(`Should return null if method is called (max + 2) or more times. `,
      () => {
        const lotto = new Lottotron(6)
        const { max } = lotto
        let counter = 0

        while (counter < max + 5) {
          if (counter <= max + 1) {
            lotto.next()
          } else {
            assert.isNull(lotto.next())
          }
          counter++
        }
      }
    )

    it(`Should not return equal number sequenses from different Lottotron instance.`,
      () => {
        const maxNumber = 8
        const lotto1 = new Lottotron(maxNumber)
        const lotto2 = new Lottotron(maxNumber)

        const sequence1 = Array(maxNumber + 1).fill(null)
          .map(() => lotto1.next())

        const sequence2 = Array(maxNumber + 1).fill(null)
          .map(() => lotto2.next())

        assert.isFalse(sequence1.every((number, index) => {
          return sequence2[index] === number
        }))
      }
    )
  })

  describe('#rest', () => {
    it(`Should be an array.`,
      () => {
        const { rest } = new Lottotron(32)
        assert.isArray(rest)
      }
    )

    it('Should contain all numbers of the interval that were not returned from the method "next".',
      () => {
        const maxNumber = 5
        const lotto = new Lottotron(maxNumber)

        let remainder = Array(maxNumber + 1).fill(null)
          .map((value, index) => index)

        for (let i = 0; i <= maxNumber; i++) {
          const { rest } = lotto

          assert.deepEqual(rest, remainder)

          const number = lotto.next()
          const index = remainder.findIndex((value) => value === number)
          remainder.splice(index, 1)
        }
      }
    )

    it(`Should return an empty array if all numbers from the interval was returned`,
      () => {
        const maxNumber = 13
        const lotto = new Lottotron(13)
        let counter = 0

        while (counter < maxNumber + 7) {
          lotto.next()
          if (counter > maxNumber + 1) {
            assert.isEmpty(lotto.rest)
          }
          counter++
        }
      }
    )

    it(`Should return new array every time method calls.`,
      () => {
        const lotto = new Lottotron(3)

        const oldValue = lotto.rest
        lotto.rest = Symbol('newValue')
        assert(lotto.rest !== oldValue)
      }
    )

    it('Should be a read-only property.',
      () => {
        const lotto = new Lottotron(3)

        const oldValue = lotto.rest
        lotto.rest = Symbol('newValue')
        assert.deepEqual(lotto.rest, oldValue)
      }
    )

    it(`Should return the same result if the array returned in the previous call is changed.`,
      () => {
        const lotto = new Lottotron(13)
        const { rest } = lotto
        const restCopy = rest.map((item) => item)
        rest[6] = Symbol('someValue')
        assert.deepEqual(lotto.rest, restCopy)
      }
    )
  })

  describe('#reload()', () => {
    it(`The #rest array should contain all numbers after that the #reload()was called.`,
      () => {
        const maxNumber = 9
        const lotto = new Lottotron(maxNumber)
        const expectedRest = getNaturalNumbersTo(maxNumber)

        while (lotto.rest.length > 2) lotto.next()
        lotto.reload()
        assert.deepEqual(lotto.rest, expectedRest)
      }
    )

    it(`The #next() method should return all numbers of the interval in (maxNumber + 1) method calls after that the #reload() method was called.`,
      () => {
        const maxNumber = 17
        const lotto = new Lottotron(maxNumber)

        while (lotto.rest.length > 0) lotto.next()
        lotto.reload()

        assert(
          Array(maxNumber + 1).fill(null)
            .map(() => lotto.next())
            .every((number, index, numberList) => numberList.includes(index))
        )
      }
    )
  })
})