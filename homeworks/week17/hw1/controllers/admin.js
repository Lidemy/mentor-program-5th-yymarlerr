const db = require('../models')

const Blog = db.blog_articles

const adminController = {
  handleAdd: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/')
    }

    const { username } = req.session
    const { title, content } = req.body
    if (!title || !content || !username) {
      req.flash('errorMessage', '資料不齊全')
      return next()
    }

    Blog.create({
      title,
      content,
      is_deleted: 1
    }).then(() => {
      res.redirect('/articles_list')
    }).catch((err) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return next()
      }
    })
  },

  add: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/')
    }

    res.render('add_blog')
  },

  handleUpdate: (req, res, next) => {
    if (!req.session.username) {
      return res.redirect('/')
    }

    const { title, content } = req.body

    if (!title || !content) {
      req.flash('errorMessage', '資料不齊全')
      return next()
    }

    const { id } = req.params
    Blog.update({
      id,
      title,
      content
    }, {
      where: {
        id
      }
    }).then((result) => {
      console.log(result)
      res.redirect('/')
    }).catch((err) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return res.redirect('/')
      }
    })
  },

  update: (req, res) => {
    if (!req.session.username) {
      return res.redirect('/')
    }

    const { id } = req.params

    Blog.findOne({
      where: {
        id
      }
    }).then((results) => {
      res.render('update_blog', {
        results
      })
    }).catch((err) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return res.redirect('/')
      }
    })
  },

  handleDelete: (req, res) => {
    const { id } = req.params
    Blog.update({
      is_deleted: 2
    }, {
      where: {
        id
      }
    }).then(() => {
      res.redirect('/admin')
    }).catch((err) => {
      if (err) {
        req.flash('errorMessage', err.toString())
        return res.redirect('/')
      }
    })
  }

}

module.exports = adminController
