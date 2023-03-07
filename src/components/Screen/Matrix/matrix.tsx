import classNames from 'classnames';
import { CSSProperties, useEffect, useState } from 'react';
import { BlockValue } from '../blocks';
import './matrix.scss'

interface MatrixProps {
  className?: string;
  matrix: Array<Array<BlockValue>>;
  blockSize?: number;
}

function Matrix(props: MatrixProps) {
  const pClassName = props.className ? 'matrix ' + props.className : 'matrix';
  let { matrix, blockSize = 1 } = props;

  const [blockStyle, setBlockStyle] = useState<CSSProperties>({})

  useEffect(() => {
    setBlockStyle({
      width: `calc(${blockSize * 100 / matrix[0].length}% - 8px)`,
      paddingBottom: `calc(${blockSize * 100 / matrix[0].length}% - 8px)`,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  return (
    <div className={pClassName}>
      {
        matrix.map((row, index) => (
          <p key={index} className='matrix_row'>
            {
              row.map((col, index) => (
                <b
                  key={index}
                  className={classNames({
                    'matrix_block': true,
                    'matrix_block-filled': col === 1,
                  })}
                  style={blockStyle}
                />
              ))
            }
          </p>
        ))
      }
    </div>
  )
}

export default Matrix;