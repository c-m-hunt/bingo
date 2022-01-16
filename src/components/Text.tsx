import React, { useCallback } from "react";
import { TextStyle } from "pixi.js";
import { Text, Graphics } from "@inlet/react-pixi";

interface MessageTextProps {
  width: number;
  height: number;
  size: number;
  text: string;
}

export const Message = ({ width, height, text, size }: MessageTextProps) => {
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

export const LookingForText = ({ size, text }: LookingForTextProps) => {
  const textStyle = new TextStyle({
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
    wordWrapWidth: size * 6,
  });
  return <Text text={text} anchor={0} style={textStyle} />;
};

interface ReadyToGoTextProps {
  size: number;
}

export const ReadyToGoText = ({ size }: ReadyToGoTextProps) => {
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
