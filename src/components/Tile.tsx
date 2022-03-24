import { Digit } from '../types';
import clsx from 'clsx';

function Tile(props: Digit & { index: number }) {
  const { num, state, index } = props;
  return (
    <div className={clsx(['tile', state, num !== '' && 'filled', state && 'revealed'])}>
      <div className='front' style={{ transitionDelay: `${index * 300}ms` }}>
        {num}
      </div>
      <div
        className={clsx(['back', state])}
        style={{
          transitionDelay: `${index * 300}ms`,
          animationDelay: `${index * 100}ms`
        }}
      >
        {num}
      </div>
    </div>
  );
}

export default Tile;
