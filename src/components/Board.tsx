import React from 'react'
import Tile from './Tile'
import './styles/Board.css'
const Board = ({board}:{board: number [][]}) => {
  return (
    <>
    {board.map((line, line_index)=>{
      return(
        <div className='center' key={line_index}>
          {line.map((tilevalue, title_index) => (
            <Tile value={tilevalue} key={title_index}/>
          ))}
        </div>
      )
    })}
    </>
  )
}

export default Board