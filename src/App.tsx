import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';

function getRandomInt(min: number, max:number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

  const isEmpty = (board: number[][]) => {
    for(let x=0; x<board[0].length;x++){
      for(let y=0;y<board.length;y++){
        if(board[x][y] != 0)
          return false
      }
    }
    return true
  }

  const isFull = (board: number[][]) => {
    for(let x=0; x<board[0].length;x++){
      for(let y=0;y<board.length;y++){
        if(board[x][y] === 0)
          return false
      }
    }
    return true
  }

const addNumberToBoard = (n:number, board: number [][], addNumber: boolean,setAddNumber: Function) : number[][] => {
  const updatedBoard = board.slice();
  if(!addNumber){
    return board;
  }
  setAddNumber(false);
  if(isFull(board))
    return board;
  
  let x = 0
  let y = 0
  do{
    x = getRandomInt(0,updatedBoard[0].length -1)
    y = getRandomInt(0,updatedBoard.length-1)
  }while(updatedBoard[x][y] != 0)
  
  if(updatedBoard[x][y] === 0){
    updatedBoard[x][y] = 2
  }
  return updatedBoard
}

//----------------------------------------
function filterZeros(arr : number[]){
  return arr.filter(n => n != 0);
}

function fillWithZeros(arr:number[], length:number){
  while(arr.length < length){
    arr.push(0);
  }
  return arr;
}

function sumNumbersInArray(arr:number[]){
  for(let x=0;x<arr.length -1; x++){
      if(arr[x] == arr[x+1]){
          arr[x] *=2
          arr[x+1] = 0
      }
  }
  return arr
}

function shiftArr(row:number[]){
  let filteredRow = filterZeros(row);
  let sum = sumNumbersInArray(filteredRow);
  sum = filterZeros(sum)
  return fillWithZeros(sum, row.length)
}

//------------------------------------------


function App() {
  
    
  const [update,setUpdate] = useState(false);
  const [addNumber, setAddNumber] = useState(false);
  const [gameBoard, setGameBoard] = useState(
   [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
   ])

  


   const [numberAdded, setNumberAdded] = useState(false);

  const [loading,setLoading] = useState(true)

  const addFirstNumberToBoard = (n: number) => {
    let newBoard = gameBoard
    if(isEmpty(newBoard)){
      newBoard[getRandomInt(0,gameBoard[0].length-1)][getRandomInt(0,gameBoard.length-1)] = 2
      setGameBoard(newBoard)
    }
  }


  useEffect(()=> {
    if(addNumber == true){
      setGameBoard(addNumberToBoard(2, gameBoard, addNumber,setAddNumber))
    }
  }, [addNumber])

  
  useEffect(()=>{
    setLoading(false);
    addFirstNumberToBoard(2);
    document.onkeyup =  (e) => {
    let originalArray:number[][] = []
    let board :number[][] = []
      gameBoard.forEach(l =>{
      let row:number[] = []
      l.forEach(n =>{
        row.push(n);
      })
      originalArray.push(row)
    })

      switch (e.key) {  
          case 'ArrowLeft':
            board = moveLeft(gameBoard);
            break;
          
          case 'ArrowUp':
            board = moveUp(gameBoard);
            break;
  
          case 'ArrowRight':
              board = moveRight(gameBoard);
              break;
  
          case 'ArrowDown':
            board = moveDown(gameBoard);
            break;
      }
      
      
      if(JSON.stringify(originalArray) !== JSON.stringify(board)){
        setAddNumber(true)
      }
      setGameBoard(board);
    };
   
   
  },[])
  
  const moveLeft = (board: number[][]) => {
    for(let x=0;x<board[0].length;x++){
      board[x] = (shiftArr(board[x]))
    }
    return board
  }

  const moveRight = (board: number[][]) => {  
    for(let x=0;x<board[0].length;x++){
      board[x] = shiftArr(board[x].reverse()).reverse()
    }
    return board
  }

  const moveUp = (board: number[][])  => {
    //push zeroes to top
  for(let x=0;x<board.length;x++){
    let row: number [] = []
    for (let y=board.length-1; y>=0;y--){
      row.push(board[y][x]);
    }
    
    //remove zeros
    let rowWithoutZeros:number[]=[]
    for(let y=0;y<row.length;y++){
      if(row[y] !== 0){
        rowWithoutZeros.push(row[y])
      }
    }
    row = rowWithoutZeros
  

    //merge
    for(let y=0;y<row.length-1;y++){
      if(row[y] ===  row[y+1]){
        row[y] *= 2
        row[y+1] = 0
      }
    }
    

    //remove zeros
    rowWithoutZeros = []
    for(let y=0;y<row.length;y++){
      if(row[y] !== 0){
        rowWithoutZeros.push(row[y])
      }
    }
    row = rowWithoutZeros

    //add zeros back
    while(row.length < board.length){
      row = [0, ...row]  
    }
    
    let z = 0;
    for(let y=board.length-1;y>=0;y--){
      board[y][x] = row[z]
      z++;
    }    
  }

  

    return board
  }

  const moveDown = (board: number[][]) => {
    //push zeroes to top
  for(let x=0;x<board.length;x++){
    let row: number [] = []
    for (let y=board.length-1; y>=0;y--){
      row.push(board[y][x]);
    }
    //remove zeros
    let rowWithoutZeros:number[]=[]
    for(let y=0;y<row.length;y++){
      if(row[y] !== 0){
        rowWithoutZeros.push(row[y])
      }
    }
    row = rowWithoutZeros

    //merge
    for(let y=row.length-1;y>0;y--){
      if(row[y] ===  row[y-1]){
        row[y] *= 2
        row[y-1] = 0
      }
    }

    //remove zeros
    rowWithoutZeros = []
    for(let y=0;y<row.length;y++){
      if(row[y] !== 0){
        rowWithoutZeros.push(row[y])
      }
    }
    row = rowWithoutZeros

    //add zeros back
    while(row.length < board.length){
      row = [...row,0]  
    }
    
    let z = 0;
    for(let y=board.length-1;y>=0;y--){
      board[y][x] = row[z]
      z++;
    }    
  }
    return board
  }


  return (
    <>
    {loading? <div></div>: <Board board={gameBoard}/>}
    </>
  );
}


export default App;
  