import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BingoState, pickBall, restartGame } from './store';

const App = () => {
  const remainingBalls = useSelector<BingoState, number[]>(state => state.remainingBalls);
  const pickedBalls = useSelector<BingoState, number[]>(state => state.pickedBalls);
  const dispatch = useDispatch();
  return (
    <div className="App">
      <header className="App-header">

      </header>
      <section>
        <div>
          <button onClick={() => {dispatch(pickBall())}}>Pick a ball</button>
          <button onClick={() => {dispatch(restartGame())}}>Restart game</button>
        </div>
        <div>
          {remainingBalls.map(ball => (
            <span key={ball}>{ball}</span>
          ))}
        </div>
        <div>
          {pickedBalls.map(ball => (
            <span key={ball}>{ball}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
