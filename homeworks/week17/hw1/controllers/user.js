const bcrypt = require('bcrypt')

const db = require('../models')

const User = db.blog_user
const saltRounds = 10

const userController = {
  login: (req, res) => {
    res.render('login')
  },

  register: (req, res) => {
    res.render('register')
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '資料不齊全')
      return next()
    }

    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '使用者不存在')
        return next()
      }

      bcrypt.compare(password, user.password, (err, isSuccessful) => {
        if (err || !isSuccessful) {
          req.flash('errorMessage', '登入失敗')
          return next()
        }

        req.session.username = user.username
        res.redirect('/')
      })
    }).catch((err) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return next()
      }
    })
  },

  handleRegister: (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '資料填寫不完全')
      return next()
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return next()
      }

      User.create({
        username,
        password: hash
      }).then((user) => {
        req.session.username = username
        res.redirect('/')
      }).catch((err) => {
        if (err) {
          req.flash('errorMessage', err.toString())
          return next()
        }
      })
    })
  },

  logout: (req, res) => {
    req.session.username = null
    res.redirect('/')
  }
}

module.exports = userController
