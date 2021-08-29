/* eslint-env jquery */
getCounts('sonya', (data) => {
  const { counts } = data
  const { total } = counts[0]
  let number = total + 1

  getComments('sonya', number, (data) => {
    const comments = data.discussion
    for (const comment of comments) {
      appendCommentToDom($('.comments'), comment, true)
    }
    $('.container').append(`
      <button type="submit" class="btn btn-info load_more" name="load_more">載入更多</button>
    `)

    $('.container').on('click', '.load_more', () => {
      getComments('sonya', number -= 5, (data) => {
        const comments = data.discussion
        if (number > 0) {
          for (const comment of comments) {
            appendCommentToDom($('.comments'), comment, true)
          }
        }
        if (number < 7) {
          $('.load_more').hide()
        }
      })
    })
  })
})

$('.add_comment_form').submit((e) => {
  e.preventDefault()
  const newCommentData = {
    site_key: 'sonya',
    nickname: $('input[name=nickname]').val(),
    content: $('textarea[name=content]').val()
  }

  $.ajax({
    type: 'POST',
    url: 'http://mentor-program.co/mtr04group1/yide/week12/hw1/api_add_comments.php',
    data: newCommentData
  })
    .done((data) => {
      data = JSON.parse(data)
      if (!data.ok) {
        alert(data.message)
        return
      }

      appendCommentToDom($('.comments'), newCommentData, false)
      $('input[name=nickname]').val('')
      $('textarea[name=content]').val('')
    })
})

function escape(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function appendCommentToDom(container, comment, isAppend) {
  const content =
  `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${escape(comment.nickname)}</h5>
        <p class="card-text">${escape(comment.content)}</p>
      </div>
    </div>
  `
  if (isAppend) {
    container.append(content)
  } else {
    container.prepend(content)
  }
}

function getComments(siteKey, before, callback) {
  $.ajax({
    type: 'GET',
    url: `http://mentor-program.co/mtr04group1/yide/week12/hw1/api_comments.php?site_key=${siteKey}&before=${before}`
  })
    .done((data) => {
      data = JSON.parse(data)
      if (!data.ok) {
        alert(data.message)
        return
      }
      callback(data)
    })
}

function getCounts(siteKey, callback) {
  $.ajax({
    type: 'GET',
    url: `http://mentor-program.co/mtr04group1/yide/week12/hw1/api_comments.php?site_key=${siteKey}`
  })
    .done((data) => {
      data = JSON.parse(data)
      if (!data) {
        console.log('Error occurs when counting the numbers of comments')
      }
      callback(data)
    })
}
