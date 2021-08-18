/*
 * Reasons to throw LottotronError
 */
const REASON_ = {
  MAX_IS_NOT_NUMBER: 'The input option "maxNumber" should be a number.',
  MAX_LOWER_ZERO: 'The input option "maxNumber" should be greater than 0.',
  MAX_IS_NOT_FINITE: 'The input option "maxNumber" should be a finite number.'
}

/**
 * Error to throw from the Lottotron instance
 */
class LottotronError extends Error {}

LottotronError.REASON_ = REASON_

module.exports = LottotronError