document.querySelector('form').addEventListener('submit',
  (e) => {
    const selectItems = document.querySelectorAll('input')
    function isBlank() {
      for (let i = 0; i < selectItems.length - 2; i++) {
        if (selectItems[i].value === '') {
          return true
        } else {
          return false
        }
      }
    }

    if (!(selectItems[3].checked || selectItems[4].checked)) {
      document.querySelectorAll('.form__reminder')[3].style = 'color: red'
    }

    if (selectItems[0].value === '') {
      document.querySelectorAll('.form__reminder')[0].style = 'color: red'
    }

    if (selectItems[1].value === '') {
      document.querySelectorAll('.form__reminder')[1].style = 'color: red'
    }

    if (selectItems[2].value === '') {
      document.querySelectorAll('.form__reminder')[2].style = 'color: red'
    }

    if (selectItems[5].value === '') {
      document.querySelectorAll('.form__reminder')[4].style = 'color: red'
    }

    if ((!(isBlank())) && ((selectItems[3].checked || selectItems[4].checked) === true)) {
      let result = ''
      for (let i = 0; i < selectItems.length - 2; i++) {
        result += `${selectItems[i].value}/`
      }
      alert(result)
    } else {
      e.preventDefault()
    }
  }
)
