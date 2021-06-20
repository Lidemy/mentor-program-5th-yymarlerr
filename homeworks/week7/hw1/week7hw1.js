document.querySelector('form').addEventListener('submit',
  (e) => {
    addReminder(0, 0)
    addReminder(1, 1)
    addReminder(2, 2)
    addReminder(3, 4)
    isChecked()

    if ((!notAllIsFilledIn()) && isChecked()) {
      alert(printContent())
    } else {
      e.preventDefault()
    }
  }
)

const selectText = document.querySelectorAll('input[type="text"]')
const selectRadio = document.querySelectorAll('input[type="radio"]')
const selectReminder = document.querySelectorAll('.form__reminder')

function printContent() {
  let result = ''
  for (let i = 0; i < selectText.length - 1; i++) {
    result += `${selectText[i].value}/ `
  }
  if (selectRadio[0].checked) {
    result += `${selectRadio[0].value}/ `
  }
  if (selectRadio[1].checked) {
    result += `${selectRadio[1].value}/ `
  }
  return result
}

function addReminder(i, j) {
  if (selectText[i].value === '') {
    selectReminder[j].classList.remove('hide')
  } else {
    selectReminder[j].classList.add('hide')
  }
}

function notAllIsFilledIn() {
  for (let i = 0; i < selectText.length - 2; i++) {
    if (selectText[i].value === '') {
      return true
    } else {
      return selectText[i].value === ''
    }
  }
}

function isChecked() {
  if (selectRadio[0].checked || selectRadio[1].checked) {
    selectReminder[3].classList.add('hide')
    return true
  } else {
    selectReminder[3].classList.remove('hide')
    return selectRadio[0].checked || selectRadio[1].checked
  }
}
