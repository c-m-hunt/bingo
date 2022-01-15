import { Container } from "@inlet/react-pixi";
import React from "react";
import { Ball } from "./Ball";

interface Props {
  initialBalls: number[];
  pickedBalls: number[];
  size: number;
}

export const AllBalls = ({ initialBalls, pickedBalls, size }: Props) => {
  const ballSize = size || 100;
  return (
    <Container>
      {initialBalls.map((b, i) => {
        return (
          <Container
            key={`${b}-${ballSize}`}
            x={(i % 10) * (ballSize + ballSize / 10)}
            y={Math.floor(i / 10) * (ballSize + ballSize / 10)}
          >
            <Ball
              number={b}
              color={pickedBalls.includes(b) ? 0xff0000 : 0x000000}
              size={ballSize}
            />
          </Container>
        );
      })}
    </Container>
  );
};
