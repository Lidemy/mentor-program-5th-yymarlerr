const request = require('request')
const process = require('process')

if (process.argv[2] === 'list') {
  request.get(
    'https://lidemy-book-store.herokuapp.com/books/',
    (error, response, body) => {
      const json = JSON.parse(body)
      for (let i = 0; i < 20; i++) {
        console.log(json[i].id, json[i].name)
      }
    }
  )
} else if (process.argv[2] === 'read') {
  request.get(
    `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      const json = JSON.parse(body)
      console.log(json.name)
    }
  )
} else if (process.argv[2] === 'delete') {
  request.delete(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`
    }, (err, response, body) => {
      console.log(body)
    }
  )
} else if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books/',
      form: {
        name: process.argv[3]
      }
    }, (err, response, body) => {
      console.log(body)
    }
  )
} else if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: {
        name: process.argv[4]
      }
    }, (err, response, body) => {
      console.log(body)
    }
  )
}
