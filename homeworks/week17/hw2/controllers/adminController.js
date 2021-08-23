const db = require('../models')

const Prize = db.lottery_prizes

const adminController = {
  add: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/')
    }
    res.render('add')
  },

  handleAdd: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/')
    }

    const { prize, desc, link, percentage } = req.body
    if (!prize || !desc || !link || !percentage) {
      req.flash('errorMessage', '資訊填寫不完全')
      return res.redirect('back')
    }

    Prize.create({
      prize,
      desc,
      link,
      percentage
    }).then(() => {
      res.redirect('/admin')
    }).catch((err) => {
      if (err) {
        req.flash('errorMessage', '新增失敗')
        return res.redirect('back')
      }
    })
  },

  admin: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/')
    }

    Prize.findAll({
      where: {
        is_deleted: null
      }
    }).then((prizes) => {
      res.render('admin', {
        prizes
      })
    }).catch((err) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return res.redirect('/')
      }
    })
  },

  index: (req, res) => {
    Prize.findAll({
      where: {
        is_deleted: null
      },
      order: [
        ['percentage', 'DESC']
      ],
      limit: 3
    }).then((prizes) => {
      res.render('index', {
        prizes
      })
    }).catch((err) => {
      if (err) {
        return req.flash('errorMessage', err.toString())
      }
    })
  },

  update: (req, res) => {
    if (!req.session.username) {
      res.redirect('/')
    }

    Prize.findOne({
      where: {
        id: req.params.id
      }
    }).then((results) => {
      res.render('update', {
        results
      })
    }).catch((err) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return res.redirect('back')
      }
    })
  },

  handleUpdate: (req, res) => {
    if (!req.session.username) {
      res.redirect('/')
    }
    const { id } = req.params
    const { prize, desc, link, percentage } = req.body
    if (!prize || !desc || !link || !percentage) {
      req.flash('errorMessage', '資訊填寫不完全')
      return res.redirect('back')
    }

    Prize.update({
      prize,
      desc,
      link,
      percentage
    }, {
      where: {
        id
      }
    }).then(() =>
      res.redirect('/admin')
    ).catch((err) => {
      if (err) {
        console.log(err)
        req.flash('errorMessage', err.toString())
        return res.redirect('back')
      }
    })
  },

  delete: (req, res) => {
    if (!req.session.username) {
      res.redirect('/')
    }

    const { id } = req.params

    Prize.update({
      is_deleted: 1
    }, {
      where: {
        id
      }
    }).then(() =>
      res.redirect('back')
    ).catch((err) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return res.redirect('back')
      }
    })
  }
}

module.exports = adminController
