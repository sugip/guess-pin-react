import { DigitState, PinList } from './types';

export default class Game {
  private readonly maxTrials: number;
  private readonly pinLength: number;
  private readonly answer: string;

  constructor(maxTrials: number, pinLength: number) {
    this.maxTrials = maxTrials;
    this.pinLength = pinLength;
    this.answer = '2234';
  }

  newGame(trial: number, pinLength: number): PinList {
    return Array.from({ length: trial }, () =>
      Array.from({ length: pinLength }, () => ({
        num: '',
        state: DigitState.INITIAL
      }))
    );
  }

  isGameOver(trial: number): boolean {
    return trial >= this.maxTrials - 1;
  }

  hasFilled(gameState: PinList, trial: number): boolean {
    const current = gameState[trial].map((d) => d.num).join('');
    return current.length === this.pinLength;
  }

  append(gameState: PinList, trial: number, num: string): PinList {
    const newState = [...gameState];
    for (const digit of newState[trial]) {
      if (digit.num === '') {
        digit.num = num;
        break;
      }
    }
    return newState;
  }

  delete(gameState: PinList, trial: number): PinList {
    const newState = [...gameState];
    const current = newState[trial];

    for (let i = current.length - 1; i >= 0; i--) {
      const tile = current[i];
      if (tile.num) {
        tile.num = '';
        break;
      }
    }
    return newState;
  }

  getResult(gameState: PinList, trial: number) {
    const pin = gameState[trial].map((d) => d.num).join('');
    if (pin.length !== 4) {
      return gameState;
    }

    const newState = [...gameState];
    const current = newState[trial];

    let answerDigits = Array.from(this.answer);

    // 場所まで一致を先に検証
    current.forEach((d, i) => {
      if (d.num === answerDigits[i]) {
        d.state = DigitState.CORRECT;
        answerDigits[i] = '#';
      }
    });

    current.forEach((t) => {
      if (t.state === DigitState.INITIAL) {
        const position = this.answer.indexOf(t.num);
        if (position > -1) {
          t.state = DigitState.PRESENT;
          answerDigits[position] = '#';
        } else {
          t.state = DigitState.ABSENT;
        }
      }
    });

    return newState;
  }
}
