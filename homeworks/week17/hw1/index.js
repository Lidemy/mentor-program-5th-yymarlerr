const express = require('express')

const app = express()

const bodyParser = require('body-parser')

const session = require('express-session')

const flash = require('connect-flash')

const port = process.env.PORT || 5001

const adminController = require('./controllers/admin')
const userController = require('./controllers/user')
const blogController = require('./controllers/blog')

app.set('view engine', 'ejs')

app.use('/public', express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

function redirectBack(req, res) {
  res.redirect('back')
}

app.get('/', blogController.index)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, redirectBack)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, redirectBack)
app.get('/logout', userController.logout)

app.get('/admin', blogController.admin)
app.get('/articles_list', blogController.viewArticle)
app.get('/blog_itself/:id', blogController.get)

app.get('/add_blog', adminController.add)
app.post('/add_blog', adminController.handleAdd, redirectBack)
app.get('/update_blog/:id', adminController.update)
app.post('/update_blog/:id', adminController.handleUpdate, redirectBack)
app.get('/handle_delete_blog/:id', adminController.handleDelete)

app.listen(port, () => {
  console.log(`hello world, listening on port ${port}`)
})
