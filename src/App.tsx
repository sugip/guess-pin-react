import { useReducer } from 'react';
import AnswerList from './components/AnswerList';
import NumPad from './components/NumPad';
import { reducer, initialState } from './gameReducer';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Authenticator>
      {({ signOut }) => (
        <div className='guess-pin'>
          <AnswerList pinList={state.pinList} />
          <NumPad dispatch={dispatch} />
          <button onClick={signOut}>sign out</button>
          {state.message && <div className='message'>{state.message}</div>}
        </div>
      )}
    </Authenticator>
  );
};

export default App;
