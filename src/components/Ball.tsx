import React, { useEffect, useState, useCallback } from "react";
import { Graphics, Text, Container } from "@inlet/react-pixi";
import { TextStyle } from "pixi.js";

interface Props {
  number: number;
  color?: number;
  size: number;
}

export const Ball = ({ number, color, size }: Props) => {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.lineStyle(2, 0xffffff, 1);
      g.beginFill(color !== undefined ? color : 0xff3300);
      g.drawCircle(size / 2, size / 2, size / 2);
      g.endFill();
    },
    [color, size]
  );
  return (
    <>
      <Graphics draw={draw} />
      <Container key={size} width={size * 2} height={size * 2}>
        <Text
          text={number?.toString()}
          x={size / 2}
          y={size / 2}
          anchor={0.5}
          style={
            new TextStyle({
              align: "center",
              fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
              fontSize: size / 2,
              fontWeight: "bold",
              fill: ["#ffffff"], // gradient
              stroke: "#000",
              strokeThickness: size / 100,
              letterSpacing: size / 20,
              dropShadow: true,
              dropShadowColor: "#000",
              dropShadowBlur: size / 20,
              dropShadowAngle: Math.PI / 6,
              dropShadowDistance: size / 50,
            })
          }
        />
      </Container>
    </>
  );
};
