const request = new XMLHttpRequest()
const url = 'https://api.twitch.tv/kraken/games/top?limit=5'

request.open('GET', url, 'true')

request.setRequestHeader('Client-id', 'fnh3sbi5r9kkf5u93s8lvqou9fz7is')
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')

request.onload = () => {
  const json = request.responseText
  const data = JSON.parse(json)

  if (request.status >= 200 && request.status < 400) {
    try {
      JSON.parse(request.responseText)
    } catch (err) {
      alert('系統不穩定')
      console.log(err)
      return
    }

    for (let i = 0; i < 5; i++) {
      const gameList = document.createElement('ul')
      gameList.classList.add(`game${i}`)
      gameList.innerHTML = `${data.top[i].game.name}`
      document.querySelector('.list').appendChild(gameList)
      document.querySelector('.game-name').innerText = `${data.top[0].game.name}`
    }

    const game = []
    for (let i = 0; i < data.top.length; i++) {
      game.push(data.top[i].game.name)
    }

    sendTheRequest(game[0].split(' ').join('%20'))

    document.querySelector('nav').addEventListener('click',
      (e) => {
        if (e.target.classList.contains('game0')) {
          createContent(game[0])
        } else if (e.target.classList.contains('game1')) {
          createContent(game[1])
        } else if (e.target.classList.contains('game2')) {
          createContent(game[2])
        } else if (e.target.classList.contains('game3')) {
          createContent(game[3])
        } else if (e.target.classList.contains('game4')) {
          createContent(game[4])
        }
      }
    )
  }
}

request.onerror = (error) => {
  console.log(error)
}

request.send()

function sendTheRequest(gameName) {
  const urlAll = `https://api.twitch.tv/kraken/streams/?limit=20&game=${gameName}`
  const requestAll = new XMLHttpRequest()
  requestAll.open('GET', urlAll, 'true')
  requestAll.setRequestHeader('Client-id', 'fnh3sbi5r9kkf5u93s8lvqou9fz7is')
  requestAll.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')

  requestAll.onload = () => {
    if (requestAll.status >= 200 && requestAll.status < 400) {
      const jsonAll = requestAll.responseText
      const dataAll = JSON.parse(jsonAll)
      for (let i = 0; i < 20; i++) {
        const streamName = document.createElement('div')
        streamName.classList.add('stream')
        streamName.innerHTML = `
                <div class='stream-content'>
                    <a href='${dataAll.streams[i].channel.url}'><img src=${dataAll.streams[i].preview.medium} /></a>
                    <div class='logo-desc'>
                        <img class='logo' src=${dataAll.streams[i].channel.logo} />
                        <div class='desc-content'>
                            <div class='channel-title'>${dataAll.streams[i].channel.status}</div>
                            <div class='channel-name'>${dataAll.streams[i].channel.name}</div>
                        </div>
                    </div>
                </div>
                `
        document.querySelector('.stream-list').appendChild(streamName)
      }
    }
  }
  requestAll.onerror = (error) => {
    console.log(error.target.status)
  }
  requestAll.send()
}

function createContent(data) {
  const topStreams = document.querySelectorAll('.stream')
  for (let i = 0; i < topStreams.length; i++) {
    topStreams[i].parentNode.removeChild(topStreams[i])
  }
  document.querySelector('.game-name').innerText = `${data}`
  sendTheRequest(data.split(' ').join('%20'))
}
