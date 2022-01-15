import { Container } from '@inlet/react-pixi';
import React from 'react';
import { Ball } from './Ball';

interface Props {
  initialBalls: number[];
  pickedBalls: number[];
  size: number;
}


export const AllBalls = ({ initialBalls, pickedBalls, size }: Props) => {
  return (
    <Container>
      {initialBalls.map((b, i) => {
        return (
          <Container key={b} x={(i%10) * (size + size/10)} y={Math.floor((i / 10)) * (size + size/10)}>
            <Ball number={b} color={pickedBalls.includes(b) ? 0xff0000 : 0x000000} size={size} />
          </Container>
        )
      })}
    </Container>
  )

}
