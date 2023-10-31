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
    //console.log(x+", "+y)
  }while(updatedBoard[x][y] != 0)
  
  if(updatedBoard[x][y] === 0){
    updatedBoard[x][y] = n
  }
  return updatedBoard
}

//----------------------------------------
function rotateRight(array : number [][]) {
  let result : number[]|any = [];
  array.forEach(function (a, i, aa) {
      a.forEach(function (b, j, bb) {
          result[bb.length - j - 1] = result[bb.length - j - 1] || [];
          result[bb.length - j - 1][i] = b;
      });
  });
  return result;
}
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

 

  useEffect(() =>{
    if(numberAdded){  
      setGameBoard(prev => prev = addNumberToBoard(2, gameBoard))
      setNumberAdded(false)
      
    }
  } , [numberAdded])
  
  useEffect(()=>{
    setLoading(false);
    addFirstNumberToBoard(2);
    document.onkeyup =  (e) => {
      //alert(e.code)
      switch (e.key) {  
          case 'ArrowLeft':
            const left = moveLeft(gameBoard);
            if(left.moveCount > 0){
              setGameBoard(prev => prev = left.board)
              setGameBoard(addNumberToBoard(2,gameBoard));
            }
            
              break;
          case 'ArrowUp':
            const up = moveUp(gameBoard);
            if(up.moveCount > 0){
              setGameBoard(prev => prev = up.board )
              setGameBoard(addNumberToBoard(2,gameBoard));
            }
            break;
  
          case 'ArrowRight':
              const {board, moveCount} = moveRight(gameBoard);
              if(moveCount > 0){
                setGameBoard(prev => prev = board)
                setGameBoard(addNumberToBoard(2,gameBoard));
              }  
              break;
  
          case 'ArrowDown':
            const down = moveDown(gameBoard);
            if(down.moveCount > 0){
              setGameBoard(prev => prev = down.board)
              setGameBoard(addNumberToBoard(2,gameBoard));
            }
              break;
      }
      
      
    };
   
   
  },[])
  
  const moveLeft = (board: number[][]) 
  : {board: number[][], moveCount: number} => {
    for(let x=0;x<board[0].length;x++){
      board[x] = (shiftArr(board[x]))
    }
    return {board: board.slice(), moveCount: 1}
  }
  
  // const moveLeft = (board: number[][]) 
  // : {board: number[][], moveCount: number} => {
  //   let updatedBoard = board.slice()
  //   let moveCount = 0;
  //   let merged = false;

  //   for(let x =0; x<updatedBoard[0].length;x++){
  //     let line = ""
  //     for(let y=updatedBoard.length-1; y>=0; y--){
  //       line = line + x+y+" ";
  //       if(y-1 >= 0){
  //         if(!merged
  //           &&
  //           updatedBoard[x][y] != 0
  //           && (
  //             updatedBoard[x][y-1] == 0
  //             || updatedBoard[x][y-1] == updatedBoard[x][y]
  //           )
  //           ){
  //           //move left
  //           //merge
  //           merged = true;
  //           moveCount++
  //           updatedBoard[x][y-1] = updatedBoard[x][y-1]+updatedBoard[x][y]
  //           updatedBoard[x][y] = 0 
  //         }else{
  //           merged = false;
  //         }
  //       }
  //     }
  //   }
  //   return {board: updatedBoard, moveCount: moveCount}
  // }

  const moveRight = (board: number[][]) 
  : {board: number[][], moveCount: number} => {
    for(let x=0;x<board[0].length;x++){
      board[x] = shiftArr(board[x].reverse()).reverse()
    }
    return {board: board.slice(), moveCount: 1}
  }


  const moveUp = (board: number[][]) 
  : {board: number[][], moveCount: number} => {
    for(let x=0;x<board.length;x++){
      let row: number[] = []
  
      //push zeros to the bottom
      for(let y=0;y<board.length;y++){
          
          if(board[y][x] !== 0){
              row.push(board[y][x])
          }
          
      }
      while(row.length<board.length){
              row.push(0)
      }
  
      for(let y=0;y<board.length-1;y++){   
          board[y][x] = row[y] 
      }
      //------------------------------
      for(let x=0;x<board.length;x++){
          for(let y=0;y<board.length-1;y++){
              if(board[y+1][x] !== 0 && board[y][x] ==board[y+1][x]){
                  board[y][x] *=2
                  board[y+1][x] =0
              }
          }
  
      }
      
      
  }
  for(let x=0;x<board.length;x++){
      let row: number[] = []
  
      //push zeros to the bottom
      for(let y=0;y<board.length;y++){
          
          if(board[y][x] !== 0){
              row.push(board[y][x])
          }
          
      }
      while(row.length<board.length){
              row.push(0)
      }
  
      for(let y=0;y<board.length-1;y++){   
          board[y][x] = row[y] 
      }
      //------------------------------
  }
  //return board;


    return {board: board.slice(), moveCount: 1}
  }
  

  // const moveUp = (board: number[][]) 
  // : {board: number[][], moveCount: number} => {
  //   let updatedBoard = board.slice()
  //   let moveCount = 0;
  //   let merged = false
  //   for(let x =updatedBoard[0].length-1; x>=0;x--){
  //     let line = ""
  //     for(let y=updatedBoard.length-1; y>=0; y--){
  //       line = line + x+y+" ";
  //       if(y-1 >= 0){
  //         if(!merged
  //           && updatedBoard[y][x] != 0
  //           && (
  //             updatedBoard[y-1][x] == 0
  //             || updatedBoard[y-1][x] == updatedBoard[y][x]
  //           )
  //           ){
  //           //move left
  //           merged = true
  //           moveCount++
  //           updatedBoard[y-1][x] = updatedBoard[y-1][x]+updatedBoard[y][x]
  //           updatedBoard[y][x] = 0 
  //         }else{
  //           merged = false;
  //         }
  //       }
  //     }
  //     console.log(line);
  //   }

  //   return {board: updatedBoard, moveCount: moveCount}
  // }

  const moveDown = (board: number[][]) 
  : {board: number[][], moveCount: number} => {
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
    
    return {board: board.slice(), moveCount: 1}
  }

  // const moveDown = (board: number[][]) 
  // : {board: number[][], moveCount: number} => {
  //   let updatedBoard = board.slice()
  //   let moveCount = 0;
  //   let merged = false
  //   for(var x=0;x<updatedBoard[0].length;x++){
  //     for(var y=0;y<updatedBoard.length;y++){
  //       if(y+1 < updatedBoard.length){
  //         if(!merged
  //           && updatedBoard[y][x] !== 0 
  //           && (
  //              updatedBoard[y+1][x] === 0 
  //           || updatedBoard[y+1][x] === updatedBoard[y][x])){
            
  //             merged = true;
  //               moveCount++;
  //             //set next number to the right
  //             updatedBoard[y+1][x] = updatedBoard[y][x] + updatedBoard[y+1][x];
  //             //set current number to 0
  //             updatedBoard[y][x] = 0;
              
  //           }else{
  //             merged = false;
  //           }
  //       }
  //     }
  //   }
    
  //   return {board: updatedBoard, moveCount: moveCount}
  // }


  


  return (
    <>
    {loading? <div></div>: <Board board={gameBoard}/>}
    </>
  );
}

const transpose = (matrix : number[][]) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let column = 0; column < row; column++) {
      let temp = matrix[row][column]
      matrix[row][column] = matrix[column][row]
      matrix[column][row] = temp
    }
  }
  return matrix;
}

export default App;
  