const express = require('express')

const app = express()
const port = process.env.PORT || 5002
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('connect-flash')

app.set('view engine', 'ejs')

const userController = require('./controllers/userController')
const adminController = require('./controllers/adminController')
const lotteryController = require('./controllers/lotteryController')

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

app.get('/login', userController.login)
app.post('/login', userController.handleLogin)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister)
app.get('/logout', userController.logout)

app.get('/add', adminController.add)
app.post('/add', adminController.handleAdd)
app.get('/admin', adminController.admin)
app.get('/', adminController.index)
app.get('/update/:id', adminController.update)
app.post('/update/:id', adminController.handleUpdate)
app.get('/delete/:id', adminController.delete)

app.get('/lottery', lotteryController.getDrawResult)

app.listen(port, () => {
  console.log(`app listening on ${port}`)
})
