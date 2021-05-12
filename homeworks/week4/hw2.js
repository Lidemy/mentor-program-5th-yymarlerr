const request = require('request')
const process = require('process')

const [, , action, id, newName] = process.argv

switch (action) {
  case 'list':
    listBook()
    break
  case 'read':
    readBook(id)
    break
  case 'delete':
    deleteBook(id)
    break
  case 'create':
    createBook(action, id)
    break
  case 'update':
    updateBook(action, id, newName)
    break
  default:
    console.log('unknown action')
}

function listBook() {
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
}

function readBook(id) {
  request.get(
    `https://lidemy-book-store.herokuapp.com/books/${id}`,
    (error, response, body) => {
      if (error) {
        console.log('error', error)
        return
      }

      let books
      try {
        books = JSON.parse(body)
      } catch (error) {
        console.log(error)
        return
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(books.name)
      } else {
        console.log('找不到相關書籍')
      }
    }
  )
}

function deleteBook(id) {
  request.delete(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${id}`
    }, (error, response, body) => {
      if (error) {
        console.log('error', error)
        return
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log('刪除成功')
      } else {
        console.log('刪除失敗，找不到相符 ID')
      }
    }
  )
}

function createBook(action, name) {
  function checkId() {
    if (id) {
      return id
    } else {
      return '未輸入書名'
    }
  }
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books/',
      form: {
        name: checkId()
      }
    }, (error, response, body) => {
      if (error) {
        console.log('error', error)
        return
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(body)
      }
    }
  )
}

function updateBook(action, id, newName) {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${id}`,
      form: {
        name: newName
      }
    }, (error, response, body) => {
      if (error) {
        console.log('error', error)
        return
      }
      if (response.statusCode >= 200 && response.statusCode < 300) {
        console.log(body)
      } else {
        console.log('修改失敗')
      }
    }
  )
}
