import { Container } from '@inlet/react-pixi';
import React from 'react';
import { Ball } from './Ball';

interface Props {
  initialBalls: number[];
  remainingBalls: number[];
  pickedBalls: number[];
}


export const AllBalls = ({ initialBalls, remainingBalls, pickedBalls }: Props) => {

  return (
    <Container scale={0.3}>
      {initialBalls.map((b, i) => {
        return (
          <Container x={(i%10) * 220} y={Math.floor((i / 10)) * 220}>
            <Ball number={b} color={pickedBalls.includes(b) ? 0xff0000 : 0x000000} />
          </Container>
        )
      })}
    </Container>
  )

}