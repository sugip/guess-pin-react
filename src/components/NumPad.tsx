import { memo, Dispatch } from 'react';
import { Action, ACTION_TYPES } from '../gameReducer';

const NumPad = memo((props: { dispatch: Dispatch<Action> }) => {
  const { dispatch } = props;

  const onClickNumber = (num: string) => {
    dispatch({ type: ACTION_TYPES.APPEND, num });
  };

  const onClickEnter = () => {
    dispatch({ type: ACTION_TYPES.ENTER });
  };

  const onClickDelete = () => {
    dispatch({ type: ACTION_TYPES.DELETE });
  };

  return (
    <div id='keyboard'>
      <div className='keyboard-row'>
        <button onClick={() => onClickNumber('1')}>1</button>
        <button onClick={() => onClickNumber('2')}>2</button>
        <button onClick={() => onClickNumber('3')}>3</button>
      </div>
      <div className='keyboard-row'>
        <button onClick={() => onClickNumber('4')}>4</button>
        <button onClick={() => onClickNumber('5')}>5</button>
        <button onClick={() => onClickNumber('6')}>6</button>
      </div>
      <div className='keyboard-row'>
        <button onClick={() => onClickNumber('7')}>7</button>
        <button onClick={() => onClickNumber('8')}>8</button>
        <button onClick={() => onClickNumber('9')}>9</button>
      </div>
      <div className='keyboard-row'>
        <button onClick={() => onClickDelete()}>Delete</button>
        <button onClick={() => onClickNumber('0')}>0</button>
        <button onClick={() => onClickEnter()}>Enter</button>
      </div>
    </div>
  );
});

export default NumPad;
