import { PinList } from '../types';
import Answer from './Answer';

const AnswerList = (props: { pinList: PinList }) => {
  const { pinList } = props;
  return (
    <div>
      {pinList.map((pin, i) => (
        <Answer key={`pin-${i}`} pin={pin} />
      ))}
    </div>
  );
};

export default AnswerList;
