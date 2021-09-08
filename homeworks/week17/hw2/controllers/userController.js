const bcrypt = require('bcrypt')

const saltRounds = 10
const db = require('../models')

const User = db.lottery_user

const userController = {
  login: (req, res) => {
    res.render('login')
  },

  handleLogin: (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '資料輸入不正確')
      return res.redirect('back')
    }

    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '出現錯誤')
        return res.redirect('back')
      }
      bcrypt.compare(password, user.password, (err, isSucessful) => {
        if (err || !isSucessful) {
          req.flash('errorMessage', '資料輸入錯誤')
          return res.redirect('back')
        }

        req.session.username = username
        res.redirect('/admin')
      })
    }).catch((err) => {
      if (err) {
        req.flash('errorMessage', '資料輸入錯誤')
        return res.redirect('back')
      }
    })
  },

  register: (req, res) => {
    res.render('register')
  },

  handleRegister: (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', '資料填寫不完整')
      return res.redirect('back')
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return res.redirect('back')
      }

      User.create({
        username,
        password: hash
      }).then(() => {
        res.redirect('/')
      }).catch((err) => {
        if (err) {
          req.flash('errorMessage', err.toString())
          return res.redirect('back')
        }
      })
    })
  },

  logout: (req, res) => {
    req.session.destroy()
    res.redirect('/')
  }

}

module.exports = userController
