import { BingoState } from ".";
export const getLastNumber = (state: BingoState): number | undefined => {
  const { pickedBalls } = state;
  return pickedBalls.at(-1);
};

export const lookingFor = ["Line", "Corners", "House"];
export const getLookingForText = (state: BingoState): string => {
  return lookingFor[state.lookingFor];
};
