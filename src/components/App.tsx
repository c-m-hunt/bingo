import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextStyle } from "pixi.js";
import { Stage, Container, Text, Graphics } from "@inlet/react-pixi";
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
        <Container x={(width / 20) * 14} y={(height / 100) * 65}>
          <LookingForText
            text={`Looking for ${lookingFor}`}
            size={width / 25}
          />
        </Container>
        {checkingWin && (
          <Container x={(width / 20) * 5} y={(height / 4) * 1}>
            <Message
              height={height / 2}
              width={width / 2}
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

interface MessageTextProps {
  width: number;
  height: number;
  size: number;
  text: string;
}

const Message = ({ width, height, text, size }: MessageTextProps) => {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(0xffffff, 0.9);
      g.drawRoundedRect(0, 0, width, height, size);
      g.endFill();
    },
    [height, width]
  );
  return (
    <>
      <Graphics draw={draw} />
      <Text
        text={text}
        width={width - width / 10}
        x={width / 2}
        y={height / 2}
        anchor={0.5}
        style={{
          fontFamily: "Arial",
          fontSize: size,
          fill: "black  ",
          align: "center",
          dropShadow: true,
          dropShadowColor: "#fffffff",
          dropShadowBlur: size / 5,
          dropShadowDistance: size / 20,
        }}
      />
    </>
  );
};

interface LookingForTextProps {
  size: number;
  text: string;
}

const LookingForText = ({ size, text }: LookingForTextProps) => {
  return (
    <Text
      text={text}
      anchor={0}
      style={
        new TextStyle({
          align: "center",
          fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
          fontSize: size,
          fontWeight: "bold",
          fill: ["#ffffff"], // gradient
          stroke: "#000",
          strokeThickness: size / 100,
          letterSpacing: size / 20,
          dropShadow: true,
          dropShadowColor: "#ffffff",
          dropShadowBlur: size / 20,
          dropShadowDistance: size / 50,
          wordWrap: true,
        })
      }
    />
  );
};

interface ReadyToGoTextProps {
  size: number;
}

const ReadyToGoText = ({ size }: ReadyToGoTextProps) => {
  return (
    <Text
      text="Get ready to start!"
      anchor={0}
      style={
        new TextStyle({
          align: "center",
          fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
          fontSize: size,
          fontWeight: "bold",
          fill: ["#ffffff"], // gradient
          stroke: "#000",
          strokeThickness: size / 100,
          letterSpacing: size / 20,
          dropShadow: true,
          dropShadowColor: "#ffffff",
          dropShadowBlur: size / 20,
          dropShadowDistance: size / 50,
          wordWrap: true,
        })
      }
    />
  );
};
