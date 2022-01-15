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
  const lookingFor = useSelector<BingoState, string>(state => state.lookingFor);
  const lastNumber = useSelector(getLastNumber);
  const dispatch = useDispatch();
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

  const { height, width } = canvasSize;
  const ballSize = width / 8
  return (
    <div ref={canvasRef} style={{ width: '100vw', height: '100vh' }}>
      <Stage width={width} height={height}>
        {lastNumber && <Container x={width / 20 * 3.5} y={height / 20 * 2}>
          <Ball number={lastNumber} size={width / 20 * 5} />
        </Container>}
        <Container x={width / 50} y={height / 4 * 3} anchor={0.5}>
          {[...pickedBalls].reverse().slice(0, 5).map((b, i) => (
            <Container x={i * (ballSize / 10 * 11)} key={b}>
              <Ball number={b} size={ballSize}/>
            </Container>
          ))}
        </Container>
        <Container x={width / 20 * 12}>
          <AllBalls initialBalls={initialBalls} pickedBalls={pickedBalls} size={width/30} />
        </Container>
        <Container>

        </Container>
      </Stage>
    </div >
  );
}

export default App;
