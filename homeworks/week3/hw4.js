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
  const a = lines
  let result = ''
  for (let i = 1; i <= a.length; i++) {
    result += a[a.length - i]
  }
  if (a === result) {
    return true
  /* eslint-disable-next-line */
  } else {
    return false
  }
}
