export const enum DigitState {
  INITIAL = 0,
  CORRECT = 'correct',
  PRESENT = 'present',
  ABSENT = 'absent'
}

export type Digit = {
  num: string;
  state: DigitState;
};

export type Pin = Digit[];

export type PinList = Pin[];

export type GameState = {
  pinList: PinList;
  trial: number;
  answer: string;
  message: string | undefined;
};
