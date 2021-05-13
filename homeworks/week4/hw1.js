const request = require('request')

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (error) {
      console.log('error:', error)
      return
    }

    let books
    try {
      books = JSON.parse(body)
    } catch (error) {
      console.log(error)
      return
    }

    for (let i = 0; i < books.length; i++) {
      console.log(books[i].id, books[i].name)
    }
  }
)
