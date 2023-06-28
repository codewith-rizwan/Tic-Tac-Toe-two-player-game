import React, { useEffect, useState } from 'react';
import './style.css';

type Player = 'X' | 'O' | null;

interface SquareProps {
  value: Player;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
};

const App: React.FC = () => {
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'draw' | null>(null);

  useEffect(() => {
    if (winner) {
      document.body.classList.add('winner-background');
    } else {
      document.body.classList.remove('winner-background');
    }
  }, [winner]);

  const handleClick = (index: number) => {
    if (winner || squares[index]) {
      return;
    }

    const updatedSquares = [...squares];
    updatedSquares[index] = currentPlayer;
    setSquares(updatedSquares);

    checkWinner(updatedSquares, currentPlayer);
    setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));
  };

  const checkWinner = (squares: Player[], currentPlayer: Player) => {
    const winningCombos: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        setWinner(currentPlayer);
        return;
      }
    }

    if (squares.every((square) => square !== null)) {
      setWinner('draw');
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className="tik-tok-toe">
      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      {winner && (
        <div className="result">
          {winner === 'draw' ? (
            <p>It's a draw!</p>
          ) : (
            <p>{`Player ${winner} wins!`}</p>
          )}
          <button onClick={resetGame}>Reset Game</button>
        </div>
      )}
    </div>
  );
};

export default App;
