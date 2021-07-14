import $ from 'jquery'
import { getComments, addComments } from './api'
import { appendCommentToDOM, appendStyle } from './utils'
import { cssTemplate, getLoadMoreButton, getForm } from './templates'
/* eslint-disable import/prefer-default-export */
export function init(options) {
  let siteKey = ''
  let apiUrl = ''
  let containerElement = null
  let commentDOM = null
  let lastId = null
  let isEnd = false
  let loadMoreClassName
  let commentsClassName
  let commentsSelector
  let formClassName
  let formSelector
  /* eslint-disable */
  siteKey = options.siteKey
  apiUrl = options.apiUrl
  loadMoreClassName = `${siteKey}-load-more`
  commentsClassName = `${siteKey}-comments`
  formClassName = `${siteKey}-add-comment-form`
  commentsSelector = `.${commentsClassName}`
  formSelector = `.${formClassName}`
  /* eslint-enable */
  containerElement = $(options.containerSelector)
  containerElement.append(getForm(formClassName, commentsClassName))
  appendStyle(cssTemplate)

  commentDOM = $(commentsSelector)
  getNewComments()

  $(commentsSelector).on('click', `.${loadMoreClassName}`, () => {
    getNewComments()
  })

  $(formSelector).submit((e) => {
    e.preventDefault()
    const nickNameDOM = $(`${formSelector} input[name=nickname]`)
    const contentDOM = $(`${formSelector} textarea[name=content]`)
    const newCommentData = {
      site_key: siteKey,
      nickname: nickNameDOM.val(),
      content: contentDOM.val()
    }
    addComments(apiUrl, siteKey, newCommentData, (data) => {
      data = JSON.parse(data)
      if (!data.ok) {
        alert(data.message)
        return
      }
      nickNameDOM.val('')
      contentDOM.val('')
      appendCommentToDOM(commentDOM, newCommentData, false)
    })
  })

  function getNewComments() {
    const commentDOM = $(commentsSelector)
    $(`.${loadMoreClassName}`).hide()
    if (isEnd) {
      return
    }
    getComments(apiUrl, siteKey, lastId, (data) => {
      data = JSON.parse(data)
      if (!data.ok) {
        alert(data.message)
        return
      }

      const comments = data.discussion
      for (const comment of comments) {
        appendCommentToDOM(commentDOM, comment, true)
      }
      const { length } = comments
      if (length === 0) {
        isEnd = true
        $(`.${loadMoreClassName}`).hide()
      } else {
        lastId = comments[length - 1].id
        const loadMoreButtonHTML = getLoadMoreButton(loadMoreClassName)
        $(commentsSelector).append(loadMoreButtonHTML)
      }
    })
  }
}
