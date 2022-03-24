import { Reducer } from 'react';
import { GameState, DigitState, PinList, Pin } from './types';
import { cloneDeep, repeat, random } from 'lodash';

const MAX_TRIALS = 6;
const PIN_LENGTH = 4;

const initializePins = (): PinList =>
  Array.from({ length: MAX_TRIALS }, () =>
    Array.from({ length: PIN_LENGTH }, () => ({
      num: '',
      state: DigitState.INITIAL
    }))
  );

const generatePin = (): string => {
  const pin: number = random(Math.pow(10, PIN_LENGTH) - 1);
  return (repeat('0', PIN_LENGTH) + pin).slice(-1 * PIN_LENGTH);
};

export const initialState: GameState = {
  pinList: initializePins(),
  answer: generatePin(),
  trial: 0,
  message: undefined
};

export const ACTION_TYPES = {
  APPEND: 'append',
  ENTER: 'enter',
  DELETE: 'delete'
} as const;

type AppendAction = {
  type: typeof ACTION_TYPES.APPEND;
  num: string;
};

type EnterAction = {
  type: typeof ACTION_TYPES.ENTER;
};

type DeleteAction = {
  type: typeof ACTION_TYPES.DELETE;
};

export type Action = AppendAction | EnterAction | DeleteAction;

export const reducer: Reducer<GameState, Action> = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.APPEND:
      return append(state, action.num);
    case ACTION_TYPES.ENTER:
      return check(state);
    case ACTION_TYPES.DELETE:
      return remove(state);
    default:
      throw new Error();
  }
};

const append = (state: GameState, num: string): GameState => {
  const { pinList, trial } = state;
  const newPinList = cloneDeep(pinList);

  for (const digit of newPinList[trial]) {
    if (digit.num === '') {
      digit.num = num;
      break;
    }
  }

  return { ...state, pinList: newPinList };
};

const remove = (state: GameState): GameState => {
  const { pinList, trial } = state;

  const newPinList = cloneDeep(pinList);
  const current = newPinList[trial];

  for (let i = current.length - 1; i >= 0; i--) {
    const tile = current[i];
    if (tile.num) {
      tile.num = '';
      break;
    }
  }

  return { ...state, pinList: newPinList };
};

const check = (state: GameState): GameState => {
  const { pinList, trial, answer } = state;

  const pin = pinList[trial].map((d) => d.num).join('');
  if (pin.length !== 4) {
    return state;
  }

  const newPinList = cloneDeep(pinList);
  const current = newPinList[trial];

  let answerDigits = Array.from(answer);

  // 場所まで一致を先に検証
  current.forEach((d, i) => {
    if (d.num === answerDigits[i]) {
      d.state = DigitState.CORRECT;
      answerDigits[i] = '#';
    }
  });

  current.forEach((t) => {
    if (t.state === DigitState.INITIAL) {
      const position = answerDigits.indexOf(t.num);
      if (position > -1) {
        t.state = DigitState.PRESENT;
        answerDigits[position] = '#';
      } else {
        t.state = DigitState.ABSENT;
      }
    }
  });

  if (isCorrectAnswer(current)) {
    return { ...state, pinList: newPinList, message: '正解' };
  }

  if (isGameOver(trial)) {
    return { ...state, pinList: newPinList, message: `正解は ${answer}` };
  }

  return { ...state, pinList: newPinList, trial: trial + 1 };
};

const isCorrectAnswer = (pin: Pin) => {
  return !pin.some((d) => d.state !== DigitState.CORRECT);
};

const isGameOver = (trial: number): boolean => {
  return trial >= MAX_TRIALS - 1;
};
