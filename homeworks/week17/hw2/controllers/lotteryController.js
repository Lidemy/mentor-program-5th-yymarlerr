const db = require('../models')

const Prize = db.lottery_prizes

const lotteryController = {
  getDrawResult: (req, res) => {
    Prize.findAll({
      where: {
        is_deleted: null
      }
    }).then((result) => {
      const saveThePrizes = []
      for (let i = 0; i < result.length; i++) {
        for (let j = 0; j < result[i].percentage; j++) {
          saveThePrizes.push(result[i].id)
        }
      }

      const resultOfTheDraw = saveThePrizes[Math.floor(Math.random() * saveThePrizes.length)]

      Prize.findOne({
        where: {
          id: resultOfTheDraw
        }
      }).then((result) => {
        res.render('lottery', {
          result
        })
      }).catch((err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  }

}

module.exports = lotteryController
