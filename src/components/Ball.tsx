import React, { useCallback } from 'react';
import { Graphics, Text, Container } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js'

interface Props {
  number: number;
  color?: number;
}

export const Ball = ({ number, color }: Props) => {
  const draw = React.useCallback(g => {
    g.clear()
    g.beginFill(color !== undefined ? color : 0xff3300)
    g.drawCircle(100, 100, 100)
    g.endFill()
  }, [color])
  return (
    < >
      <Graphics draw={draw} />
      <Container width={200} height={200}>
        <Text text={number?.toString()} x={100} y={100} anchor={0.5} style={
          new TextStyle({
            align: "center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize: 100,
            fontWeight: 'bold',
            fill: ['#ffffff'], // gradient
            stroke: '#000',
            strokeThickness: 5,
            letterSpacing: 20,
            dropShadow: true,
            dropShadowColor: '#000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
          })
        } />
      </Container>
    </>
  )
}