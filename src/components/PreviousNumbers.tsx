import React from "react";
import { Container } from "@inlet/react-pixi";
import { Ball } from "./Ball";

interface Props {
  pickedNumbers: number[];
  size: number;
}

export const PreviousNumbers = ({ pickedNumbers, size }: Props) => {
  return (
    <>
      {[...pickedNumbers]
        .reverse()
        .slice(0, 5)
        .map((b, i) => (
          <Container x={i * ((size / 10) * 11)} key={b}>
            <Ball number={b} size={size} />
          </Container>
        ))}
    </>
  );
};
