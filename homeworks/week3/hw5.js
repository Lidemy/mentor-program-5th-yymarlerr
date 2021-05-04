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
  for (let i = 1; i < lines.length; i++) {
    let str = lines[i].split(' ')
    let A = BigInt(str[0])
    let B = BigInt(str[1])
    let C = Number(str[2])
    if (C === 1) {
      bigOrsmall(A, B, C)
    } else if (C === -1) {
      bigOrsmall(A, B, C)
    }
    }
}

function bigOrsmall(a, b, c) {
  if (c === 1) {
    if (a - b < 0) {
      console.log('B')
    } else if (a - b > 0) {
      console.log('A')
    } else {
      console.log('DRAW')
    }
  }
  if (c === -1) {
    if (a - b < 0) {
      console.log('A')
    } else if (a - b > 0) {
      console.log('B')
    } else {
      console.log('DRAW')
    }
  }
}