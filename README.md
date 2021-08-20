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

Create an instance of the class `Lottotron(max)` passing the max value as option.
```javascript
const lotto = new Lottotron(3);
```

Call the method `#next()` to get the next number.

The method `#next()` returns the next number until all numbers of the inteval are returned. It returns `null` when all numbers have been returned.
```javascript
const lotto = new Lottotron(3)
let number;

while (number !== null) {
  number = lotto.next()
  console.log(number) // => 0 2 3 1 null
}
```

The property `#rest` contains all numbers that were not returned from the method `#next()`.
```javascript
const lotto = new Lottotron(3)

console.log(lotto.next()) // => 2
console.log(lotto.next()) // => 0

console.log(lotto.rest) // => [1, 3]
```

Use the method `#reload` to rallback a Lottotron instance to the initial state.
```javascript
const lotto = new Lottotron(3)

console.log(lotto.next()) // => 2
console.log(lotto.rest) // => [0, 1, 3]

lotto.reload()

console.log(lotto.rest) // => [0, 1, 2, 3]
```

The property `#max` contains a max number of the interval.
```javascript
const lotto = new Lottotron(7)
console.log(lotto.max) // => 7
```

If you get a number from the `#next()` method and you want to use them later call the `#put(number)` method. This method add the passed number to the rest of numbers.

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