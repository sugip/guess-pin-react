import { Pin } from '../types';
import Tile from './Tile';

const Answer = (props: { pin: Pin }) => {
  const { pin } = props;
  return (
    <div className='row'>
      {pin.map((digit, i) => (
        <Tile {...digit} key={`digit-${i}`} index={i} />
      ))}
    </div>
  );
};

export default Answer;
