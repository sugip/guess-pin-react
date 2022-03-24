import { useReducer } from 'react';
import AnswerList from './components/AnswerList';
import NumPad from './components/NumPad';
import { reducer, initialState } from './gameReducer';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='guess-pin'>
      <AnswerList pinList={state.pinList} />
      <NumPad dispatch={dispatch} />
      {state.message && <div className='message'>{state.message}</div>}
    </div>
  );
};

export default App;
