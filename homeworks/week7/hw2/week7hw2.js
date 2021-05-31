
document.querySelector('.section__question-1').addEventListener('click',
  (e) => {
    const parent = document.querySelector('.section__question-1')
    parent.classList.toggle('signal')
    const answer = document.createElement('div')
    answer.classList.add('section__answer-1')
    answer.innerHTML = `
        <div class='answer'>
            您於登入會員後，至『查詢訂單』查詢配送狀況，訂單狀態：
            配送中-表示已通知廠商出貨；已配送-表示廠商已送交郵局或貨運寄送。
        </div>
        <hr class="horizon"/>
        `
    if (parent.classList.contains('signal')) {
      parent.appendChild(answer)
    } else {
      parent.removeChild(parent.childNodes[7])
    }
  }
)

document.querySelector('.section__question-2').addEventListener('click',
  (e) => {
    const parent = document.querySelector('.section__question-2')
    parent.classList.toggle('signal')
    const answer = document.createElement('div')
    answer.innerHTML = `
        <div class='answer'>
            您可以在填寫訂單資料時的收件人欄位，輸入您指定的送貨地址，有「速」標誌的商品皆可離島地區配送。
        </div>
        <hr class='horizon'/>
        `
    if (parent.classList.contains('signal')) {
      parent.appendChild(answer)
    } else {
      parent.removeChild(parent.childNodes[7])
    }
  }
)

document.querySelector('.section__question-3').addEventListener('click',
  (e) => {
    const parent = document.querySelector('.section__question-3')
    parent.classList.toggle('signal')
    const answer = document.createElement('div')
    answer.innerHTML = `
        <div class='answer'>
        請您至「客服中心」與我們聯絡，我們將儘速為您查詢商品流向。
        </div>
        <hr class='horizon'/>
        `
    if (parent.classList.contains('signal')) {
      parent.appendChild(answer)
    } else {
      parent.removeChild(parent.childNodes[7])
    }
  }
)

document.querySelector('.section__question-4').addEventListener('click',
  (e) => {
    const parent = document.querySelector('.section__question-4')
    parent.classList.toggle('signal')
    const answer = document.createElement('div')
    answer.innerHTML = `
        <div class='answer'>
        系統會在網頁上顯示相關訂購成功訊息，並以電子郵件及簡訊的方式通知您該筆訂單已經成立。
        </div>
        <hr class='horizon'/>
        `
    if (parent.classList.contains('signal')) {
      parent.appendChild(answer)
    } else {
      parent.removeChild(parent.childNodes[7])
    }
  }
)

document.querySelector('.section__question-5').addEventListener('click',
  (e) => {
    const parent = document.querySelector('.section__question-5')
    parent.classList.toggle('signal')
    const answer = document.createElement('div')
    answer.innerHTML = `
        <div class='answer'>
        是的，您可以隨時點選網站「我的帳戶」，藉由『訂單管理』功能查詢您個人訂單的處理狀況；提醒您，若您當時選擇首次購買，則於此頁面下方依訂單編號進行訂單查詢。
        </div>
        <hr class='horizon'/>
        `
    if (parent.classList.contains('signal')) {
      parent.appendChild(answer)
    } else {
      parent.removeChild(parent.childNodes[7])
    }
  }
)

document.querySelector('.section__question-6').addEventListener('click',
  (e) => {
    const parent = document.querySelector('.section__question-6')
    parent.classList.toggle('signal')
    const answer = document.createElement('div')
    answer.innerHTML = `
        <div class='answer'>
        訂單成立後無法更改訂購數量，如需增加訂購品項，請您重新下單選購，再將原訂單辦理退貨即可。
        </div>
        <hr class='horizon'/>
        `
    if (parent.classList.contains('signal')) {
      parent.appendChild(answer)
    } else {
      parent.removeChild(parent.childNodes[7])
    }
  }
)

document.querySelector('.section__question-7').addEventListener('click',
  (e) => {
    const parent = document.querySelector('.section__question-7')
    parent.classList.toggle('signal')
    const answer = document.createElement('div')
    answer.innerHTML = `
        <div class='answer'>
        請您從「客戶登入」頁面進入，輸入身份證字號、密碼即可成功登入。
        </div>
        <hr class='horizon'/>
        `
    if (parent.classList.contains('signal')) {
      parent.appendChild(answer)
    } else {
      parent.removeChild(parent.childNodes[7])
    }
  }
)
