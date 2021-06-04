document.querySelector('.list__add').addEventListener('click',
  (e) => {
    const newTask = document.querySelector('.list__content').value
    if (newTask !== '') {
      const agenda = document.createElement('div')
      agenda.classList.add('newItem')
      /* eslint-disable */
      agenda.innerHTML =
        "<label><input type='checkbox' class='check' id='check'/>" + "<span class='check__sub'>ch</span>"
        + "</label>" + newTask +
       "<button class='delete' id='delete'>x</button>"
      /* eslint-enable */
      document.querySelector('.list').appendChild(agenda)
    } else {
      alert('please fill in the blank')
    }
  }
)

document.querySelector('.list').addEventListener('click',
  (e) => {
    if (e.target.classList.contains('delete')) {
      document.querySelector('.list').removeChild(e.target.closest('.newItem'))
    }
  }
)

document.querySelector('.list').addEventListener('click',
  (e) => {
    if (e.target.classList.contains('check')) {
      const allCheckbox = document.querySelectorAll('.check')
      for (let i = 0; i < allCheckbox.length; i++) {
        if (allCheckbox[i].checked) {
          document.querySelectorAll('.newItem')[i].classList.add('checked')
        } else {
          document.querySelectorAll('.newItem')[i].classList.remove('checked')
        }
      }
    }
  }
)
