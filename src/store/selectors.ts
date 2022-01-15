import { BingoState } from '.'
export const getLastNumber = (state: BingoState): number | undefined => {
  const { pickedBalls } = state;
  return pickedBalls.at(-1);
}