import { createSlice } from "@reduxjs/toolkit";
import { lookingFor as lookingForOptions } from "./selectors";

const CURRENT_GAME = "current_game";
const GAME_HISTORY = "game_history";

export interface Game {
  pickedBalls: number[];
  initialBalls: number[];
  remainingBalls: number[];
  lookingFor: number;
  complete: boolean;
}

export interface BingoState extends Game {
  history: Game[];
}

const getHistory = () => {
  return JSON.parse(window.localStorage.getItem(GAME_HISTORY) || "[]");
};

const getInitialState = (): BingoState => {
  const currentGame = window.localStorage.getItem(CURRENT_GAME);
  if (currentGame) {
    return { ...JSON.parse(currentGame), history: getHistory() };
  }
  return initialState;
};

const saveCurrentGame = (state: BingoState) => {
  const { history, ...currentGame } = { ...state };
  window.localStorage.setItem(CURRENT_GAME, JSON.stringify(currentGame));
};

const initialState: BingoState = {
  pickedBalls: [],
  initialBalls: Array.from({ length: 80 }, (_, i) => i + 1),
  remainingBalls: Array.from({ length: 80 }, (_, i) => i + 1),
  lookingFor: 0,
  complete: false,
  history: getHistory(),
};

const bingoSlice = createSlice({
  name: "bingo",
  initialState: getInitialState(),
  reducers: {
    restartGame: () => {
      saveCurrentGame(initialState);
      return getInitialState();
    },
    pickBall: (state: BingoState) => {
      const pickedBall =
        state.remainingBalls[
          Math.floor(Math.random() * state.remainingBalls.length)
        ];
      state.pickedBalls.push(pickedBall);
      state.remainingBalls = state.remainingBalls.filter(
        (ball) => ball !== pickedBall
      );
      saveCurrentGame(state);
    },
    winConfirmed: (state: BingoState) => {
      const { lookingFor } = state;
      if (lookingFor < lookingForOptions.length - 1) {
        state.lookingFor += 1;
      }
      saveCurrentGame(state);
    },
  },
});

export const { restartGame, pickBall, winConfirmed } = bingoSlice.actions;

const bingoReducer = bingoSlice.reducer;

export { bingoReducer };
