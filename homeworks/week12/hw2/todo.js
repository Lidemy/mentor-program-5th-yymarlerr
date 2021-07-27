/* eslint-env jquery */
// 新增
$('form').on('submit',
  (e) => {
    e.preventDefault()
    const inputValue = $('input').val()
    if (inputValue === '') {
      alert('please fill in the blank')
    } else {
      $('.list-group').append(`
          <li class='list-group-item d-flex justify-content-between activeness'>
            <div class='d-flex' style='max-width: 94%'>
              <input class='form-check-input me-2' type='checkbox' value='' id='flexCheckDefault'>
              <span style='max-width: 94%' >${escape(inputValue)}</span>
              <input type='text' ' class='hide' />
            </div>
            <button type='button' class='btn-close' aria-label='Close'></button>
          </li>
        `)
      $('.form-control').val('')
      $('.footer').removeClass('hide')
      $('.btn').removeClass('hide')
      countNumbersOfItemsLeft()
    }
  }
)

// 勾選
$('.list-group').on('click', 'input[type="checkbox"]', (e) => {
  $(e.target).parent().parent().toggleClass('activeness')
  $(e.target).parent().parent().toggleClass('non-active')
  countNumbersOfItemsLeft()
})

// 移除
$('.list-group').on('click', '.btn-close', (e) => {
  $(e.target).parent().remove()
  countNumbersOfItemsLeft()
})

// 編輯
$('.list-group').on('click', 'span', (e) => {
  $(e.target).addClass('hide')
  $(e.target).siblings('input').removeClass('hide')
  $(e.target).siblings('input').val(`${$(e.target).text()}`)
})

// 編輯之二
$('.list-group').on('keydown', 'input[type=text]', (e) => {
  if (e.key === 'Enter') {
    $(e.target).siblings('span').removeClass('hide')
    $(e.target).siblings('span').text(`${$(e.target).val()}`)
    $(e.target).addClass('hide')
  }
})

// 點選 All
$('.status-button').on('click', '.status-all', (e) => {
  $('.status-button').addClass('all').removeClass('active').removeClass('completed')
})

// 點選 Active
$('.status-button').on('click', '.status-active', (e) => {
  $('.status-button').addClass('active').removeClass('all').removeClass('completed')
})

// 點選 Completed
$('.status-button').on('click', '.status-completed', (e) => {
  $('.status-button').addClass('completed').removeClass('active').removeClass('all')
})

// 點選 Check All
$('button').on('click', (e) => {
  const numbersOfChecked = $('input[type="checkbox"]:checked').length
  const numbersOfTodo = $('li').length
  if (numbersOfChecked !== numbersOfTodo) {
    $('input[type="checkbox"]').prop('checked', true)
    $('li').removeClass('activeness')
    $('li').addClass('non-active')
  }

  if (numbersOfChecked === numbersOfTodo) {
    $('input[type="checkbox"]').prop('checked', false)
    $('li').addClass('activeness')
    $('li').removeClass('non-active')
  }
  countNumbersOfItemsLeft()
})

// 點選 Clear Completed
$('.clear').on('click', (e) => {
  $('.non-active').remove()
})

// 改變狀態
$('.container').on('click', (e) => {
  const active = $('.activeness')
  const nonActive = $('.non-active')
  if ($('.status-button').hasClass('completed')) {
    $('.border').removeClass('border')
    $('.status-completed').addClass('border')
    active.addClass('hide')
    nonActive.removeClass('hide')
  }

  if ($('.status-button').hasClass('all')) {
    $('.border').removeClass('border')
    $('.status-all').addClass('border')
    $('li').removeClass('hide')
  }

  if ($('.status-button').hasClass('active')) {
    $('.border').removeClass('border')
    $('.status-active').addClass('border')
    nonActive.addClass('hide')
    active.removeClass('hide')
  }
})

function escape(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function countNumbersOfItemsLeft() {
  const numbersOfActiveItems = $('.activeness').length
  $('.counts').text(`${numbersOfActiveItems} Items Left`)
}
