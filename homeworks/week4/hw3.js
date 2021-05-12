
const request = require('request')
const process = require('process')

request(
  `https://restcountries.eu/rest/v2/name/${process.argv[2]}`
  , (error, response, body) => {
    if (error) {
      console.log('error', error)
      return
    }

    if (response.statusCode >= 200 && response.statusCode < 300) {
      try {
        const data = JSON.parse(body)
        for (let i = 0; i < data.length; i++) {
          console.log('============')
          console.log(`國家：${data[i].name}`)
          console.log(`首都：${data[i].capital}`)
          console.log(`貨幣：${data[i].currencies[0].code}`)
          console.log(`國碼：${data[i].callingCodes[0]}`)
        }
      } catch (error) {
        console.log('error', error)
      }
    } else {
      console.log('找不到國家資訊')
    }
  }
)
