/*
 * Reasons to throw LottotronError
 */
const REASON_ = {

  MAX_IS_NOT_NUMBER: 'The input option "maxNumber" should be a number.',
  MAX_LOWER_ZERO: 'The input option "maxNumber" should be greater than 0.',
  MAX_IS_NOT_FINITE: 'The input option "maxNumber" should be a finite number.',

  NUMBER_IS_NOT_FINITE: 'The argument "number" has not finite value.',
  NUMBER_IS_NOT_INTEGER: 'The argument "number" is not integer.',
  NUMBER_IS_NOT_POSITIVE: 'The argument "number" is lower than 0.',
  NUMBER_IS_NOT_NUMBER: 'The argument "number" is not number.',
}

/**
 * Error to throw from the Lottotron instance
 */
class LottotronError extends Error {}

LottotronError.REASON_ = REASON_

module.exports = LottotronError