const request = require('request')

const options = {
  url: 'https://api.twitch.tv/kraken/games/top',
  headers: {
    'User-Agent': 'request',
    'client-id': 'fnh3sbi5r9kkf5u93s8lvqou9fz7is',
    Accept: 'application/vnd.twitchtv.v5+json'
  }
}

function callback(error, response, body) {
  if (!error && response.statusCode === 200) {
    const info = JSON.parse(body)
    for (let i = 0; i < 10; i++) {
      console.log(info.top[i].viewers, info.top[i].game.name)
    }
  }
}

request(options, callback)
