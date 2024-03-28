import React, { useState } from 'react';
import './App.css';
import './popup.css'

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'A', score: 0 },
    { id: 2, name: 'B', score: 0 },
    { id: 3, name: 'C', score: 0 },
    { id: 4, name: 'D', score: 0 }
  ]);

  const [clickCount, setClickCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [winnerName, setWinnerName] = useState('');
  const scoreOptions = [1000, 800, 500, 0];
  const playerScores = {};

  const randomizeScores = () => {
    if (clickCount >= 10) {
      setGameOver(true);
      determineWinner();
      return;
    }

    const scoresAvailable = [...scoreOptions];
    players.forEach(player => {
      const randomIndex = Math.floor(Math.random() * scoresAvailable.length);
      playerScores[player.id] = scoresAvailable[randomIndex];
      scoresAvailable.splice(randomIndex, 1);
    });

    const updatedPlayers = players.map(player => ({
      ...player,
      score: player.score + playerScores[player.id]
    }));
    setPlayers(updatedPlayers);
    setClickCount(clickCount + 1);
  };

  const restartGame = () => {
    setPlayers(players.map(player => ({ ...player, score: 0 })));
    setClickCount(0);
    setGameOver(false);
    setWinnerName('');
  };

  const determineWinner = () => {
    const winner = players.reduce((prev, current) => (prev.score > current.score ? prev : current));
    setWinnerName(winner.name);
  };

  const handleViewWinner = () => {
    let result = "Players' Scores:\n";
    players.forEach(player => {
      result += `${player.name}: ${player.score}\n`;
    });
    result += `\nWinner: ${winnerName}`;
    alert(result);
  };

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [diceValue, setDiceValue] = useState(null);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    // Simulate rolling by generating a random dice value after a delay
    setTimeout(() => {
      const newValue = Math.floor(Math.random() * 6) + 1;
      setDiceValue(newValue);
      setRolling(false);
    }, 1000);
  };
  // Adjust the delay as needed


return (
  <div className="App">
    <h1>Game - Play</h1>
    <p>You have 10 shuffles</p>
    <div className="square">
      <div className="players">
        {players.map(player => (
          <div className={`player player-${player.id}`} key={player.id}>
            <h2>{player.name}</h2>
            <br></br>
            <p>Score: {player.score}</p>
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="result">
          <h2>Game Over</h2>
          <p>Winner: {winnerName}</p>
        </div>
      )}
      {!gameOver && (
        <button className="random-button" onClick={randomizeScores}>
          Shuffle Scores
        </button>
      )}
    </div>
    <button className="restart-button" onClick={restartGame}>
      Restart Game
    </button>
    <button className="view-winner-button" onClick={handleViewWinner}>
      View Winner
    </button>
    <div>
      <button onClick={togglePopup}>View Winner</button>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>King</h2>
            <p>King : {winnerName}</p>
            <button onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
    <div className="App">
      <h1>Dice Rolling Animation</h1>
      <div className={`dice ${rolling ? 'rolling' : ''}`} onClick={rolling ? null : rollDice}>
        {diceValue !== null && <div className={`face face-${diceValue}`} />}
      </div>
    </div>
  </div>
);
};

export default App;
