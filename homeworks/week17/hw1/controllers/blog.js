const db = require('../models')

const Blog = db.blog_articles

const blogController = {
  get: (req, res) => {
    const { id } = req.params

    Blog.findOne({
      where: {
        id,
        is_deleted: 1
      }
    }).then((results) => {
      res.render('blog_itself', {
        results
      })
    }).catch((err) => {
      if (err) {
        req.flash('errorMesssage', err.toString())
        return res.redirect('/')
      }
    })
  },

  admin: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/')
    }

    Blog.findAll({
      where: {
        is_deleted: 1
      },
      order: [
        ['id', 'DESC']
      ]
    }).then((results) => {
      res.render('admin', {
        results
      })
    }).catch((err) => {
      if (err) {
        req.flash('errorMesssage', err.toString())
        return res.redirect('/')
      }
    })
  },

  viewArticle: (req, res) => {
    Blog.findAll({
      where: {
        is_deleted: 1
      },
      order: [
        ['id', 'DESC']
      ]
    }).then((results) => {
      res.render('articles_list', {
        results
      })
    }).catch((err) => {
      if (err) {
        req.flash('errorMesssage', err.toString())
        return res.redirect('/')
      }
    })
  },

  index: (req, res) => {
    Blog.findAll({
      where: {
        is_deleted: 1
      },
      order: [
        ['id', 'DESC']
      ],
      limit: 5
    }).then((results) => {
      res.render('index', {
        results
      })
    }).catch((err) => {
      if (err) {
        req.flash('errorMesssage', err.toString())
        return res.redirect('/')
      }
    })
  }
}

module.exports = blogController
