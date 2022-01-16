import React, { useEffect, useRef, useState } from "react";
import { Stage, Container } from "@inlet/react-pixi";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  BingoState,
  pickBall,
  restartGame,
  winConfirmed,
  cancelWin,
} from "../store";
import { getLastNumber, getLookingForText } from "../store/selectors";
import { useKeyPress } from "../hooks";
import { Ball } from "./Ball";
import { AllBalls } from "./AllBalls";
import { PreviousNumbers } from "./PreviousNumbers";
import { LookingForText, Message, ReadyToGoText } from "./Text";
export interface CanvasSize {
  width: number;
  height: number;
}

const App = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: 0,
    height: 0,
  });
  const [checkingWin, setCheckingWin] = useState<boolean>(false);
  const initialBalls = useSelector<BingoState, number[]>(
    (state) => state.initialBalls
  );
  const pickedBalls = useSelector<BingoState, number[]>(
    (state) => state.pickedBalls
  );
  const lookingFor = useSelector(getLookingForText);
  const lastNumber = useSelector(getLastNumber);
  const dispatch = useDispatch();
  const pickBallKey = useKeyPress("p");
  const restartGameKey = useKeyPress("r");
  const winKey = useKeyPress("w");
  const cancelWinKey = useKeyPress("c");

  useEffect((): any => {
    console.log("Resized");
    // Move this to its own effect
    const updateScaling = () => {
      if (canvasRef.current) {
        console.debug(
          "Setting canvas size: ",
          canvasRef.current.offsetWidth,
          canvasRef.current.offsetHeight
        );
        setCanvasSize({
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });
      }
    };

    updateScaling();
    window.addEventListener("resize", updateScaling);

    return () => {
      if (canvasRef.current) {
        window.removeEventListener("resize", updateScaling);
      }
    };
  }, [canvasRef.current?.offsetWidth, canvasRef.current?.offsetHeight]);

  useEffect((): void => {
    if (pickBallKey && !checkingWin) {
      dispatch(pickBall());
    }
  }, [dispatch, pickBallKey]);

  useEffect((): void => {
    if (restartGameKey && !checkingWin) {
      dispatch(restartGame());
    }
  }, [dispatch, restartGameKey]);

  useEffect((): void => {
    if (cancelWinKey) {
      if (checkingWin) {
        console.log("Cancelling win");
        setCheckingWin(false);
      } else {
        dispatch(cancelWin());
      }
    }
  }, [dispatch, cancelWinKey]);

  useEffect((): void => {
    if (winKey) {
      if (checkingWin) {
        dispatch(winConfirmed());
      }
      setCheckingWin(!checkingWin);
    }
  }, [winKey]);

  const { height, width } = canvasSize;
  const ballSize = width / 8;
  return (
    <div ref={canvasRef} style={{ width: "100vw", height: "100vh" }}>
      <Stage width={width} height={height}>
        {lastNumber && (
          <Container x={(width / 20) * 3.5} y={(height / 20) * 2}>
            <Ball number={lastNumber} size={(width / 20) * 5} />
          </Container>
        )}
        {!lastNumber && (
          <Container x={(width / 20) * 5} y={(height / 20) * 1}>
            <ReadyToGoText size={width / 20} />
          </Container>
        )}
        {lastNumber && (
          <Container x={width / 50} y={(height / 4) * 2.9} anchor={0.5}>
            <PreviousNumbers
              pickedNumbers={pickedBalls}
              size={ballSize * (2 / 3)}
            />
          </Container>
        )}
        <Container x={(width / 20) * 12} y={height / 100}>
          <AllBalls
            initialBalls={initialBalls}
            pickedBalls={pickedBalls}
            size={width / 30}
          />
        </Container>
        <Container x={(width / 20) * 13.5} y={(height / 100) * 65}>
          <LookingForText
            text={`Looking for ${lookingFor}`}
            size={width / 25}
          />
        </Container>
        {checkingWin && (
          <Container x={width / 6} y={(height / 4) * 1}>
            <Message
              height={height / 2}
              width={width / 1.5}
              size={width / 20}
              text="Checking win. Please wait..."
            />
          </Container>
        )}
      </Stage>
    </div>
  );
};

export default App;
