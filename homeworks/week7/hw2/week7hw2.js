document.querySelector('.section__question').addEventListener('click',
  (e) => {
    const parent = e.target.closest('.section__questions')
    if (parent) {
      parent.children.item(3).classList.toggle('hide')
    }
  }
)
