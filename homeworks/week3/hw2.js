/* eslint-disable */
var readline = require('readline');

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
/* eslint-enable */
function solve(lines) {
  const a = lines[0].split(' ')
  const N = Number(a[0])
  const M = Number(a[1])
  for (let i = N; i <= M; i++) {
    if (i === isNarcissistic(i)) {
      console.log(i)
    }
  }
}

function digitnumber(n) {
  if (n === 0) {
    return 1
  }
  for (let i = 1; i < 10e5; i++) {
    n = n / 10
    if (n < 1) {
      return i
    }
  }
}

function eachnumber(n) {
  const arr = []
  for (let i = 1; i < 10e5; i++) {
    arr.push(Math.floor(n) % 10)
    n = n / 10
    if (n < 1) { break }
  } return arr
}

function isNarcissistic(n) {
  const a = digitnumber(n)
  const b = eachnumber(n)
  let sum = 0
  for (let i = 0; i < b.length; i++) {
    sum += b[i] ** a
  }
  return sum
}
