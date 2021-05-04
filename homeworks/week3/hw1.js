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
/* eslint-enable */

function solve(lines) {
  const a = Number(lines[0])
  let star = ''
  for (let i = 1; i <= a; i++) {
  /* eslint-disable-next-line */
    star = star + '*'
    console.log(star)
  }
}
