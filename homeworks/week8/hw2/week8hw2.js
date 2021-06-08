const request = new XMLHttpRequest()
const url = 'https://api.twitch.tv/kraken/games/top?limit=5'

request.open('GET', url, 'true')

request.setRequestHeader('Client-id', 'fnh3sbi5r9kkf5u93s8lvqou9fz7is')
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')

request.onload = () => {
  if (request.status >= 200 && request.status < 400) {
    const json = request.responseText
    const data = JSON.parse(json)
    for (let i = 0; i < 5; i++) {
      const gameList = document.createElement('ul')
      gameList.classList.add(`game${i}`)
      gameList.innerHTML = `${data.top[i].game.name}`
      document.querySelector('.list').appendChild(gameList)
      document.querySelector('.game-name').innerText = `${data.top[0].game.name}`
    }

    const gameNamefirst = data.top[0].game.name
    const gameNamesecond = data.top[1].game.name
    const gameNamethird = data.top[2].game.name
    const gameNameforth = data.top[3].game.name
    const gameNamefifth = data.top[4].game.name

    const firstGame = data.top[0].game.name.split(' ').join('%20')
    const secondGame = data.top[1].game.name.split(' ').join('%20')
    const thirdGame = data.top[2].game.name.split(' ').join('%20')
    const forthGame = data.top[3].game.name.split(' ').join('%20')
    const fifthGame = data.top[4].game.name.split(' ').join('%20')

    SendtheRequest(firstGame)

    document.querySelector('nav').addEventListener('click',
      (e) => {
        if (e.target.classList.contains('game0')) {
          const topStreams = document.querySelectorAll('.stream')
          for (let i = 0; i < topStreams.length; i++) {
            topStreams[i].classList.add('hide')
          }
          document.querySelector('.game-name').innerText = `${gameNamefirst}`
          SendtheRequest(firstGame)
        } else if (e.target.classList.contains('game1')) {
          const topStreams = document.querySelectorAll('.stream')
          for (let i = 0; i < topStreams.length; i++) {
            topStreams[i].classList.add('hide')
          }
          document.querySelector('.game-name').innerText = `${gameNamesecond}`
          SendtheRequest(secondGame)
        } else if (e.target.classList.contains('game2')) {
          const topStreams = document.querySelectorAll('.stream')
          for (let i = 0; i < topStreams.length; i++) {
            topStreams[i].classList.add('hide')
          }
          document.querySelector('.game-name').innerText = `${gameNamethird}`
          SendtheRequest(thirdGame)
        } else if (e.target.classList.contains('game3')) {
          const topStreams = document.querySelectorAll('.stream')
          for (let i = 0; i < topStreams.length; i++) {
            topStreams[i].classList.add('hide')
          }
          document.querySelector('.game-name').innerText = `${gameNameforth}`
          SendtheRequest(forthGame)
        } else if (e.target.classList.contains('game4')) {
          const topStreams = document.querySelectorAll('.stream')
          for (let i = 0; i < topStreams.length; i++) {
            topStreams[i].classList.add('hide')
          }
          document.querySelector('.game-name').innerText = `${gameNamefifth}`
          SendtheRequest(fifthGame)
        }
      }
    )
  }
}

request.onerror = (error) => {
  console.log(error)
}

request.send()

function SendtheRequest(gameName) {
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
