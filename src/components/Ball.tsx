import React, { useCallback } from 'react';
import { Graphics, Text, Container } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js'

interface Props {
  number: number;
  color?: number;
}

export const Ball = ({ number, color }: Props) => {
  const size = 400;
  const draw = React.useCallback(g => {
    g.clear()
    g.beginFill(color !== undefined ? color : 0xff3300)
    g.drawCircle(size/2, size/2, size/2)
    g.endFill()
  }, [color])
  return (
    < >
      <Graphics draw={draw} />
      <Container width={size * 2} height={size * 2}>
        <Text text={number?.toString()} x={size/2} y={size/2} anchor={0.5} style={
          new TextStyle({
            align: "center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize:size/2,
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