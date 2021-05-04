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
/* eslint-disable */

function solve(lines) {
  let a = lines[0].split(' ')
  let N = Number(a[0])
  let M = Number(a[1])
  for (let i = N; i <= M; i++) {
    if(i === isNarcissistic(i)) {
      console.log(i)
    }
  }
}

function digitnumber(n) {
  if(n === 0) {
    return 1
  }
  for (let i = 1; i < 10e5; i++) {
    n = n / 10
    if (n<1) {
      return i
    }
  }
}

function eachnumber(n) {
  var arr = []
  for (let i = 1; i < 10e5; i++) {
    arr.push(Math.floor(n) % 10)
    n = n / 10
    if (n<1) { break}
  } return arr
}

function isNarcissistic(n) {
  let a = digitnumber(n)
  let b = eachnumber(n)
  let sum = 0
  for (let i = 0; i < b.length; i++) {
    sum += b[i] ** a
  }
  return sum
}
