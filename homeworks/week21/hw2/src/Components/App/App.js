import styled from "styled-components";
import React, { useEffect, useState, useRef } from "react";
import "./App.css"

const squares = []
for(let i = 1; i < 20; i++) {
  const row = []
  for(let j = 1; j < 20; j++) {
    row.push(null)
  }
  squares.push(row)
}


function Square({ value, board, handleClick}) {

  return (
    <button
      onClick={
        handleClick
      }
      className="square"
    >
      {value}
    </button>
  );
}

function Board() {
  const [board, setBoard] = useState({
    squares,
    whiteIsNext: true
  })

  const [winner, setWinner] = useState(null)

  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else {
    status = `Next player:  ${(board.whiteIsNext ? '●' : '○' )}`
  }

  function handleClick(y, x) {
    const squares = board.squares
    if (squares[y][x]) return
    if (winner) return

    squares[y][x] = board.whiteIsNext ? '●' : '○'
    setBoard({
      squares,
      whiteIsNext: !board.whiteIsNext
    })

    if (calculateWinner(squares, y, x)) {
      setWinner(squares[y][x])
      return
    }
  }

  const calculateWinner = (squares, y, x) => {
    return countContinuousChess(squares, x, y, 1, 0) + countContinuousChess(squares, x, y, -1, 0) >= 4 ||
      countContinuousChess(squares, x, y, 0, 1) + countContinuousChess(squares, x, y, 0, -1) >=4 ||
      countContinuousChess(squares, x, y, -1, -1) + countContinuousChess(squares, x, y, 1, 1) >=4 ||
      countContinuousChess(squares, x, y, 1, -1) + countContinuousChess(squares, x, y, -1, 1) >=4
  }

  const countContinuousChess = (squares, currentX, currentY, directionX, directionY) => {
    const currentColor = squares[currentY][currentX]
    let tempX = currentX + directionX
    let tempY = currentY + directionY
    if (tempX < 0) return 0
    if (tempY < 0) return 0
    if (tempX > squares.length - 1) return 0
    if (tempY > squares.length - 1) return 0
    let total = 0
    while(squares[tempY][tempX] === currentColor) {
      total++
      tempX += directionX
      tempY += directionY
      if (tempX < 0) return total
      if (tempY < 0) return total
      if (tempX > squares.length - 1) return total
      if (tempY > squares.length - 1) return total
    }

    return total
  }

  return (
    <div className="game">
      <div className="game-board">
      <div>
        <div className="status">{status}</div>
          <div className="board-row">
            {squares.map((row, rowIndex) => row.map((column, colIndex) => <Square value={board.squares[colIndex][rowIndex]} handleClick={() => { handleClick(colIndex, rowIndex) }}/>))}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Board