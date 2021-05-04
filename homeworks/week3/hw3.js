/* eslint-disable */
var readline = require('readline');
const { isPrimitive } = require('util');

var lines = []
var rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', function (line) {
  lines.push(line)
});

rl.on('close', function() {
  solve(lines)
})

/* eslint-disable */
function solve(lines) {
    for (let i = 1; i < lines.length; i++) {
      let a = Number(lines[i])
      if (isPrime(a) === true) {
        console.log('Prime')
      } else if (isPrime(a) === false) {
        console.log('Composite')
      }
    }
  }

function isPrime(n) {
  if (n === 1) {
    return false;
  }
  for (let i = 2; i <= n; i++) {
     if (n % i === 0 && n !== i) {
      return false;
    } else if (n % i === 0 && n === i) {
      return true;
    } 
  } 
}
