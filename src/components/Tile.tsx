import React from 'react'

import './styles/Tile.css'

const Tile = ({value}:{value:number}) => {
  return (
    <button className='Tile'>{value != 0? value: " "}</button>
  )
}

export default Tile