document.querySelector('.button').addEventListener('click',
  () => {
    const request = new XMLHttpRequest()
    request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true)
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        try {
          JSON.parse(request.responseText)
        } catch (err) {
          alert('系統不穩定，請再試一次')
          console.log(err)
          return
        }

        const { prize } = JSON.parse(request.responseText)

        if (!prize) {
          alert('系統不穩定，請再試一次')
          return
        }

        document.querySelector('.card').classList.add('hide')
        const prizeResult = document.querySelector('.result')
        prizeResult.classList.remove('hide')
        const title = document.querySelector('h1')
        if (prize === 'NONE') {
          prizeResult.classList.add('none')
          title.innerText = '銘謝惠顧'
        } else if (prize === 'FIRST') {
          prizeResult.classList.add('first')
          title.innerText = '恭喜你中頭獎了！日本東京來回雙人遊！'
        } else if (prize === 'SECOND') {
          prizeResult.classList.add('second')
          title.innerText = '二獎！90 吋電視一台！'
        } else if (prize === 'THIRD') {
          prizeResult.classList.add('third')
          title.innerText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！'
        }
      } else {
        alert('系統不穩定，請再試一次')
      }
    }
    request.onerror =
      () => {
        console.log('error')
        alert('系統不穩定，請再試一次')
      }
    request.send()
  }
)
