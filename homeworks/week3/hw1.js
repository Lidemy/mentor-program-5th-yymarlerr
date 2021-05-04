/* eslint-disable */
var readline = require('readline');

var lines = []
var rl = readline.createInterface({
  input: process.stdin
});

rl.on('line', function(line) {
  lines.push(line)
})

rl.on('close', function() {
  solve(lines)
})

/* eslint-disable */

function solve (lines) {
  let a = Number(lines[0])
  let star = ''
  for (let i = 1; i <= a; i++) {
    star = star + "*"
    console.log(star)
  }
}