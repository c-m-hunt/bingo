import React from "react";
import { Container, Text } from "@inlet/react-pixi";
import { TextStyle } from "pixi.js";
import { Ball } from "./Ball";

interface Props {
  pickedNumbers: number[];
  size: number;
  howMany?: number;
}

export const PreviousNumbers = ({ pickedNumbers, size, howMany }: Props) => {
  const textSize = size / 3;
  return (
    <>
      <Text
        text="Recent numbers"
        anchor={0}
        style={
          new TextStyle({
            align: "center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: textSize,
            fontWeight: "bold",
            fill: ["#ffffff"], // gradient
            stroke: "#000",
            strokeThickness: textSize / 100,
            letterSpacing: textSize / 20,
            dropShadow: true,
            dropShadowColor: "#ffffff",
            dropShadowBlur: textSize / 20,
            dropShadowDistance: textSize / 50,
            wordWrap: false,
          })
        }
      />
      {[...pickedNumbers]
        .reverse()
        .slice(0, howMany || 6)
        .map((b, i) => (
          <Container x={i * ((size / 10) * 11)} y={(size / 10) * 5} key={b}>
            <Ball number={b} size={size} />
          </Container>
        ))}
    </>
  );
};
