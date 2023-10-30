import React from 'react'

import './styles/Tile.css'

const Tile = ({value}:{value:number}) => {
  const backgroundColor = (value <= 4)? 'beige' 
    : (value<=8)? '#fc9919':
      (value<=16)?'#fc6c19':
      (value<=64)?'#fc3f19':
      (value<=256)?'#fc2819':
      '#fc1505'
  return (
    <button style={{
      backgroundColor: backgroundColor
    }}className='Tile'>{value != 0? value: " "}</button>
  )
}

export default Tile