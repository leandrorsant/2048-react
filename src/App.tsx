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

const addNumberToBoard = (n:number, board: number [][]) : number[][] => {
  const updatedBoard = board.slice();
  if(isFull(board))
    return board;

  //trying to find an empty position to add a number. This can cause an infine loop
  let x = 0
  let y = 0

  //console.log(x+" "+y)
  do{
    x = getRandomInt(0,updatedBoard[0].length -1)
    y = getRandomInt(0,updatedBoard.length-1)
    console.log(x+", "+y)
  }while(updatedBoard[x][y] != 0)
  
  if(updatedBoard[x][y] === 0){
    updatedBoard[x][y] = n
  }
  return updatedBoard
}


function App() {
  const [gameBoard, setGameBoard] = useState(
   [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
   ])

  const [loading,setLoading] = useState(true)

  const addFirstNumberToBoard = (n: number) => {
    let newBoard = gameBoard
    if(isEmpty(newBoard)){
      newBoard[getRandomInt(0,gameBoard[0].length-1)][getRandomInt(0,gameBoard.length-1)] = 2
      setGameBoard(newBoard)
    }
  }

  useEffect(()=> {
    console.log(gameBoard)
  },[gameBoard])
  
  useEffect(()=>{
    setLoading(false);
    addFirstNumberToBoard(2);
  },[])
  
  const moveLeft = (board: number[][]) 
  : {board: number[][], moveCount: number} => {
    let updatedBoard = board.slice()
    let moveCount = 0;
    let merged = false;
    for(let x =updatedBoard[0].length-1; x>=0;x--){
      let line = ""
      for(let y=updatedBoard.length-1; y>=0; y--){
        line = line + x+y+" ";
        if(y-1 >= 0){
          if(!merged
            &&
            updatedBoard[x][y] != 0
            && (
              updatedBoard[x][y-1] == 0
              || updatedBoard[x][y-1] == updatedBoard[x][y]
            )
            ){
            //move left
            //merge
            merged = true;
            moveCount++
            updatedBoard[x][y-1] = updatedBoard[x][y-1]+updatedBoard[x][y]
            updatedBoard[x][y] = 0 
          }else{
            merged = false;
          }
        }
      }
      console.log(line);
    }

    return {board: updatedBoard, moveCount: moveCount}
  }

  const moveRight = (board: number[][]) 
  : {board: number[][], moveCount: number} => {
    let updatedBoard = board.slice()
    let moveCount = 0;
    let merged = false;

    for(var x=0;x<updatedBoard[0].length;x++){
      for(var y=0;y<updatedBoard.length;y++){
        if(y+1 < updatedBoard.length){
          if(!merged
            && updatedBoard[x][y] !== 0 
            && (
               updatedBoard[x][y+1] === 0 
            || updatedBoard[x][y+1] === updatedBoard[x][y])){
              
              merged = true;
                moveCount++;
              //set next number to the right
              updatedBoard[x][y+1] = updatedBoard[x][y] + updatedBoard[x][y+1];
              //set current number to 0
              updatedBoard[x][y] = 0;
              
            }else{
              merged = false
            }
        }
      }
    }
    console.log(moveCount)
    return {board: updatedBoard, moveCount: moveCount}
  }

  const moveUp = (board: number[][]) 
  : {board: number[][], moveCount: number} => {
    let updatedBoard = board.slice()
    let moveCount = 0;
    let merged = false
    for(let x =updatedBoard[0].length-1; x>=0;x--){
      let line = ""
      for(let y=updatedBoard.length-1; y>=0; y--){
        line = line + x+y+" ";
        if(y-1 >= 0){
          if(!merged
            && updatedBoard[y][x] != 0
            && (
              updatedBoard[y-1][x] == 0
              || updatedBoard[y-1][x] == updatedBoard[y][x]
            )
            ){
            //move left
            merged = true
            moveCount++
            updatedBoard[y-1][x] = updatedBoard[y-1][x]+updatedBoard[y][x]
            updatedBoard[y][x] = 0 
          }else{
            merged = false;
          }
        }
      }
      console.log(line);
    }

    return {board: updatedBoard, moveCount: moveCount}
  }

  const moveDown = (board: number[][]) 
  : {board: number[][], moveCount: number} => {
    let updatedBoard = board.slice()
    let moveCount = 0;
    let merged = false
    for(var x=0;x<updatedBoard[0].length;x++){
      for(var y=0;y<updatedBoard.length;y++){
        if(y+1 < updatedBoard.length){
          if(!merged
            && updatedBoard[y][x] !== 0 
            && (
               updatedBoard[y+1][x] === 0 
            || updatedBoard[y+1][x] === updatedBoard[y][x])){
            
              merged = true;
                moveCount++;
              //set next number to the right
              updatedBoard[y+1][x] = updatedBoard[y][x] + updatedBoard[y+1][x];
              //set current number to 0
              updatedBoard[y][x] = 0;
              
            }else{
              merged = false;
            }
        }
      }
    }
    console.log(moveCount)
    return {board: updatedBoard, moveCount: moveCount}
  }


  document.onkeydown = function(e) {
    //alert(e.code)
    switch (e.code) {
      
        case 'ArrowLeft':
          const left = moveLeft(gameBoard);
          if(left.moveCount > 0){
            setGameBoard(prev => prev = left.board)
            setGameBoard(prev => prev = addNumberToBoard(2,gameBoard));
          }
            break;
        case 'ArrowUp':
          const up = moveUp(gameBoard);
          if(up.moveCount > 0){
            setGameBoard(prev => prev = up.board)
            setGameBoard(prev => prev = addNumberToBoard(2,gameBoard));
          }
            break;

        case 'ArrowRight':
            const {board, moveCount} = moveRight(gameBoard);
            if(moveCount > 0){
              setGameBoard(prev => prev = board)
              setGameBoard(prev => prev = addNumberToBoard(2,gameBoard));
            }
            break;

        case 'ArrowDown':
          const down = moveDown(gameBoard);
          if(down.moveCount > 0){
            setGameBoard(prev => prev = down.board)
            setGameBoard(prev => prev = addNumberToBoard(2,gameBoard));
          }
            break;
    }
  };  


  return (
    <>
    {loading? <div></div>: <Board board={gameBoard}/>}
    </>
  );
}

export default App;
