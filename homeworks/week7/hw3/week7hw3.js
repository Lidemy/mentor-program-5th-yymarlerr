document.querySelector('.list__add').addEventListener('click',
  (e) => {
    const newTask = document.querySelector('.list__content').value
    if (newTask !== '') {
      const agenda = document.createElement('div')
      agenda.classList.add('new-item')
      agenda.innerHTML =
        `
        <label><input type='checkbox' class='check'/><span class='check__sub'>ch</span></label>
        <span>${escapeHtml(newTask)}</span>
        <div><button class='delete' id='delete'>x</button></div>
        `

      document.querySelector('.to-do-things').appendChild(agenda)
    } else {
      alert('please fill in the blank')
    }
  }
)

document.querySelector('.to-do-things').addEventListener('click',
  (e) => {
    if (e.target.classList.contains('delete')) {
      document.querySelector('.to-do-things').removeChild(e.target.closest('.new-item'))
    }
  }
)

document.querySelector('.to-do-things').addEventListener('click',
  (e) => {
    if (e.target.classList.contains('check')) {
      const checkboxes = document.querySelectorAll('.check')
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          document.querySelectorAll('.new-item')[i].classList.add('checked')
        } else {
          document.querySelectorAll('.new-item')[i].classList.remove('checked')
        }
      }
    }
  }
)

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
