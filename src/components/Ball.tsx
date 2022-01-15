import React  from 'react';
import { Graphics, Text, Container } from '@inlet/react-pixi';
import { TextStyle } from 'pixi.js'

interface Props {
  number: number;
  color?: number;
  size?: number;
}

export const Ball = ({ number, color, size }: Props) => {
  const ballSize = size || 400;
  const draw = React.useCallback(g => {
    g.clear()
    g.lineStyle(2, 0xffffff, 1)
    g.beginFill(color !== undefined ? color : 0xff3300)
    g.drawCircle(ballSize/2, ballSize/2, ballSize/2)
    g.endFill()
  }, [color, ballSize])
  return (
    < >
      <Graphics draw={draw} />
      <Container width={ballSize * 2} height={ballSize * 2}>
        <Text text={number?.toString()} x={ballSize/2} y={ballSize/2} anchor={0.5} style={
          new TextStyle({
            align: "center",
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            fontSize:ballSize/2,
            fontWeight: 'bold',
            fill: ['#ffffff'], // gradient
            stroke: '#000',
            strokeThickness: ballSize / 100,
            letterSpacing: ballSize / 20,
            dropShadow: true,
            dropShadowColor: '#000',
            dropShadowBlur: ballSize / 20,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: ballSize / 50,
          })
        } />
      </Container>
    </>
  )
}