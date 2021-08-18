# @spomni/lottotron

Construct an object that returns random non-repeating integers.
The instance returns integers from 0 to the user-defined value.

## How to use

Install **`lottotron`**.

    npm install @spomni/lottotron

Add a constructor into your script.

    const Lottotron = require('@spomni/lottotron')

Create an instance of the class `Lottotron( max )` passing the max value as option.

    let lotto = new Lottotron( 9 );

Call the method `#next()` to get the next number.

    let number = lotto.next();

The method `#next()` returns the next number until all numbers of the inteval are returned. It returns `null` when all numbers have been returned.

If you need to get numbers again use the method `#reload()`. It rallback an onstance to the inital state.

    lotto.reload();

The property `#max` contains a max number of the interval.

    let max = lotto.max;

The property `#restNumbers` contains all numbers that were not returned from the method `#next()`.

    let notReturnedNumbers = lotto.restNumbers;

## Error processing

If you pass an invalid option to the constructor it throws a `LottotronError` instance with error description.


<hr>

The more information looks on the [documentation](https://spomni.github.io/lottotron).