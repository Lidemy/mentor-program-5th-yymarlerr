
const request = require('request')
const process = require('process')

request(
  `https://restcountries.eu/rest/v2/name/${process.argv[2]}`
  , (error, response, body) => {
    if (response.statusCode === 200) {
      const json = JSON.parse(body)
      console.log('國家：', json[0].name)
      console.log('首都：', json[0].capital)
      console.log('貨幣：', json[0].currencies[0].code)
      console.log('國碼：', json[0].callingCodes[0])
    } else {
      console.log('找不到國家資訊')
    }
  }
)
