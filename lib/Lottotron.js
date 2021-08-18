const LottotronError = require('./LottotronError')

const {
  MAX_IS_NOT_NUMBER,
  MAX_LOWER_ZERO,
  MAX_IS_NOT_FINITE,
} = LottotronError.REASON_

/**
 * Check if the value is number.
 *
* @param {mixed} value
* @returns {array}
* @private
 */
const isNumber = (value) => typeof(value) === 'number'

/**
 * Return a clone of the array
 *
 * @param {array} array
 * @returns {array}
 * @private
 */
const cloneArray = (array) => array.map(value => value)

/**
 * Return a random number from min to max
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 * @private
 */
const getRandomInteger = (min, max) => {
  const randomNumber = min + Math.random() * (max + 1 - min)
  return Math.floor(randomNumber)
}

/**
 * Return an integer array filled with numbers from 0 to "maxNumber".
 *
 * @param {number} maxNumber
 * @returns {array}
 * @private
 */
const createArrayOfIntegers = (maxNumber) => {
  let arrayOfIntegers = []

  for (let i = 0; i <= maxNumber; i++) {
    arrayOfIntegers[i] = i
  }

  return arrayOfIntegers
}

class Lottotron {

  /**
   * Create an object that can return random non-repeated integers.
   * It returns integers from 0 to the user-defined value.
   *
   * @param {number} max - The max number of the interval. Should be a positive finite number. The float value will be rounded down.
   *
   * @class Lottotron
   */
  constructor(max) {
    if (!isNumber(max)) {
      throw new LottotronError(MAX_IS_NOT_NUMBER)
    }

    if (!Number.isFinite(max)) {
      throw new LottotronError(MAX_IS_NOT_FINITE)
    }

    if (max < 0) {
      throw new LottotronError(MAX_LOWER_ZERO)
    }

    /**
     * The max number of the interval.
     *
     * @type {number}
     * @private
     */
    this._max = Math.floor(max)

    /**
     * The array of the numbers that were not returned from the *#getNumber()* method
     * @member {number[]} _restNumbers
     * @memberof Lottotron
     * @instance
     * @private
     */
    this._restNumbers = createArrayOfIntegers(this._max)
  }

  /**
   * The max number of the interval
   *
   * @returns {number}
   */
  get max() {
    return this._max
  }

  /**
   * The array of the numbers that were not returned from method *#getNumber()*
   *
   * @type {number[]}
   *
   * @readonly
   * @memberof Lottotron
   */
  get restNumbers() {
    return cloneArray(this._restNumbers)
  }

  /**
   * Rallback this object to the inital state.
   *
   * @returns {undefined}
   * @memberof Lottotron
   */
  reload() {
    for (let i = 0; i <= this._max; i++) {
      this._restNumbers[i] = i
    }
  }

  /**
   * Return the next number until all numbers of the inteval are returned. Return "null" when all numbers have been returned.
   *
   * @returns {number|null}
   * @memberof Lottotron
   */
  getNumber() {
    let { _restNumbers } = this

    if (_restNumbers.length === 0) {
      return null
    }

    let index = getRandomInteger(0, _restNumbers.length - 1)
    return _restNumbers.splice(index, 1)[0]
  }

}

module.exports = Lottotron
