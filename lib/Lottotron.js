const LottotronError = require('./LottotronError')

const {

  MAX_IS_NOT_POSITIVE_FINITE_NUMBER,
  
  NUMBER_IS_NOT_POSITIVE_FINITE_INTEGER,
  NUMBER_IS_GREATER_THAN_MAX,
  NUMBER_IS_ALREADY_EXISTS,
  
} = LottotronError.REASON_

const is = {
  number: (value) => typeof value === 'number',
  Integer: (value) => is.number(value) && Number.isInteger(value),
  Positive: (value) => value >= 0,
  PositiveNumber: (value) => is.number(value) && is.Positive(value),
  PositiveInteger: (value) => is.Integer(value) && is.Positive(value),
  FiniteNumber: (value) => is.number(value) && Number.isFinite(value),
}

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
  
    if (!is.PositiveNumber(max) || !is.FiniteNumber(max)) {
      throw new LottotronError(MAX_IS_NOT_POSITIVE_FINITE_NUMBER)
    }

    /**
     * The max number of the interval.
     *
     * @type {number}
     * @private
     */
    this._max = Math.floor(max)

    /**
     * The array of the numbers that were not returned from the #next() method
     *
     * @type {number[]} 
     * @private
     */
    this._rest = []
    
    // Fill this._rest with integers from 0 till this._max
    this.reload()
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
   * The array of the numbers that were not returned from method #next()
   *
   * @type {number[]}
   *
   * @readonly
   * @memberof Lottotron
   */
  get rest() {
    return cloneArray(this._rest)
  }

  /**
   * Rallback this object to the inital state.
   *
   * @returns {undefined}
   * @memberof Lottotron
   */
  reload() {
    for (let i = 0; i <= this._max; i++) {
      this._rest[i] = i
    }
  }

  /**
   * Return the next number until all numbers of the inteval are returned. Return "null" when all numbers have been returned.
   *
   * @returns {number|null}
   */
  next() {
    let { _rest } = this

    if (_rest.length === 0) {
      return null
    }

    let index = getRandomInteger(0, _rest.length - 1)
    return _rest.splice(index, 1)[0]
  }
  
  /**
   * Add the number to the rest of numbers.
   * 
   * @param {number} number
   */
  put(number) {
  
    if (!is.PositiveInteger(number) || !is.FiniteNumber(number)) {
      throw new LottotronError(NUMBER_IS_NOT_POSITIVE_FINITE_INTEGER)
    }

    if (number > this._max) {
      throw new LottotronError(NUMBER_IS_GREATER_THAN_MAX)
    }

    if (this._rest.includes(number)) {
      throw new LottotronError(NUMBER_IS_ALREADY_EXISTS)
    }
    
    this._rest.push(number)
  }
}

module.exports = Lottotron