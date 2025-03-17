import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];

function App() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  const checkWinner = (squares: BoardState): Player | 'Draw' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (squares.every(square => square !== null)) {
      return 'Draw';
    }

    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderSquare = (index: number) => {
    const value = board[index];
    return (
      <button
        onClick={() => handleClick(index)}
        className={`w-20 h-20 border-2 border-gray-300 text-4xl font-bold flex items-center justify-center
          ${!value && !winner ? 'hover:bg-gray-100' : ''}
          ${value === 'X' ? 'text-blue-600' : 'text-red-600'}`}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Tic Tac Toe</h1>
        
        <div className="mb-6 text-center">
          {winner ? (
            <div className="text-xl font-semibold">
              {winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`}
            </div>
          ) : (
            <div className="text-xl font-semibold">
              Player {currentPlayer}'s Turn
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {Array(9).fill(null).map((_, index) => (
            <div key={index}>
              {renderSquare(index)}
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold
            flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw size={20} />
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default App;