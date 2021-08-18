# @spomni/lottotron

Construct an object that returns random non-repeating integers.
The instance returns integers from 0 to the user-defined value.

## How to use

Install **`lottotron`**.
```javascript
npm install @spomni/lottotron
```

Add a constructor into your script.
```javascript
const Lottotron = require('@spomni/lottotron')
```

Create an instance of the class `Lottotron( max )` passing the max value as option.
```javascript
let lotto = new Lottotron( 9 );
```

Call the method `#next()` to get the next number.

The method `#next()` returns the next number until all numbers of the inteval are returned. It returns `null` when all numbers have been returned.
```javascript
let number = lotto.next();
```

If you need to get numbers again use the method `#reload()`. It rallback an onstance to the inital state.
```javascript
lotto.reload();
```

The property `#max` contains a max number of the interval.
```javascript
let max = lotto.max;
```

The property `#rest` contains all numbers that were not returned from the method `#next()`.
```javascript
let notReturnedNumbers = lotto.rest;
```

If you get a number from the `#next()` method and you want to use them later call the `put(number)` method. This method add the passed number to the rest of numbers.

Be careful because the `#put()` method throws an error if the passed value is greater than `#max` value or it is exists in the rest of numbers yet.

```javascript
const lotto = new Lottotron(3)

const number = lotto.next()

console.log(number) // => 1
console.log(lotto.rest) // => [0, 2, 3]

try { lotto.put(2) } catch () { console.log('error') } // => 'error'
try { lotto.put(4) } catch () { console.log('error') } // => 'error'

lotto.put(number)
console.log(lotto.rest) // => [0, 2, 3, 1]
```

## Error processing

If you pass an invalid option to the constructor or the `#put()` method an instance of `LottotronError` will thrown.
