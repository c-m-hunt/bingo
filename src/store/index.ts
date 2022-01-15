import { createSlice } from "@reduxjs/toolkit";

export interface BingoState {
  pickedBalls: number[];
  initialBalls: number[];
  remainingBalls: number[];
  lookingFor: "Line" | "Corners" | "House";
}

const initialState: BingoState = {
  pickedBalls: [],
  initialBalls: Array.from({ length: 80 }, (_, i) => i + 1),
  remainingBalls: Array.from({ length: 80 }, (_, i) => i + 1),
  lookingFor: "Line",
};

const bingoSlice = createSlice({
  name: "bingo",
  initialState,
  reducers: {
    restartGame: () => initialState,
    pickBall: (state: BingoState) => {
      const pickedBall =
        state.remainingBalls[
          Math.floor(Math.random() * state.remainingBalls.length)
        ];
      state.pickedBalls.push(pickedBall);
      state.remainingBalls = state.remainingBalls.filter(
        (ball) => ball !== pickedBall
      );
    },
  },
});

export const { restartGame, pickBall } = bingoSlice.actions;

const bingoReducer = bingoSlice.reducer;

export { bingoReducer };
