import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BingoState, pickBall, restartGame } from '../store';
import { getLastNumber } from '../store/selectors';
import { Stage, Container } from '@inlet/react-pixi';
import { useKeyPress } from '../hooks';
import { Ball } from './Ball';
import { AllBalls } from './AllBalls';

export interface CanvasSize {
  width: number;
  height: number;
}

const App = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });
  const initialBalls = useSelector<BingoState, number[]>(state => state.initialBalls);
  const remainingBalls = useSelector<BingoState, number[]>(state => state.remainingBalls);
  const pickedBalls = useSelector<BingoState, number[]>(state => state.pickedBalls);
  const lastNumber = useSelector(getLastNumber);
  const dispatch = useDispatch();
  const height = 1200;
  const width = 2000;

  const pickBallKey = useKeyPress('p');
  const restartGameKey = useKeyPress('r');

  useEffect((): any => {
    console.log("Resized")
    // Move this to its own effect
    const updateScaling = () => {
      if (canvasRef.current) {
        console.debug('Setting canvas size: ', canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        setCanvasSize({ width: canvasRef.current.offsetWidth, height: canvasRef.current.offsetHeight });
      }
    };

    updateScaling();
    window.addEventListener('resize', updateScaling);

    return () => {
      if (canvasRef.current) {
        window.removeEventListener('resize', updateScaling);
      }
    };
  }, [canvasRef.current?.offsetWidth, canvasRef.current?.offsetHeight]);

  useEffect((): void => {
    if (pickBallKey) {
      dispatch(pickBall())
    }
  }, [dispatch, pickBallKey])

  useEffect((): void => {
    if (restartGameKey) {
      dispatch(restartGame())
    }
  }, [dispatch, restartGameKey])

  return (
    <div ref={canvasRef} style={{ width: '100vw', height: '100vh' }}>
      <Stage width={canvasSize?.width} height={canvasSize.height}>
        <Container scale={3} x={200}>
          {lastNumber && <Ball number={lastNumber} />}
        </Container>
        <Container x={50} y={canvasSize.height - 250} anchor={0.5}>
          {[...pickedBalls].reverse().slice(0, 5).map((b, i) => (
            <Container x={i * 220} key={b}>
              <Ball number={b} />
            </Container>
          ))}
        </Container>
        <Container x={1200}>
          <AllBalls initialBalls={initialBalls} pickedBalls={pickedBalls} remainingBalls={remainingBalls} />
        </Container>
      </Stage>
    </div >
  );
}

export default App;

