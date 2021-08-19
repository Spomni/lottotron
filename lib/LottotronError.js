/*
 * Reasons to throw LottotronError
 */
const REASON_ = {

  MAX_IS_NOT_POSITIVE_FINITE_NUMBER: 'The argument "max" is not positive finite number.',

  NUMBER_IS_NOT_FINITE: 'The argument "number" has not finite value.',
  NUMBER_IS_NOT_INTEGER: 'The argument "number" is not integer.',
  NUMBER_IS_NOT_POSITIVE: 'The argument "number" is lower than 0.',
  NUMBER_IS_NOT_NUMBER: 'The argument "number" is not number.',
  NUMBER_IS_GREATER_THAN_MAX: 'The argument "number" is greater than max number of the Lottotron instance',

  NUMBER_IS_ALREADY_EXISTS: 'The number is already exists in the rest of numbers.',
}

/**
 * Error to throw from the Lottotron instance
 */
class LottotronError extends Error {}

LottotronError.REASON_ = REASON_

module.exports = LottotronError