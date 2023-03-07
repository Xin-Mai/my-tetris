import React from 'react';
import { BlockValue, getBlock, spinBlock } from './blocks';
import Matrix from './Matrix';
import Panel from './Panel';
import './screen.scss';

interface ScreenState {
  started: boolean,
  timer: NodeJS.Timer | null,
  matrix_size: {
    width: number;
    height: number;
  };
  matrix: Array<Array<BlockValue>>;
  curBlock?: Block | null;
}

interface Block {
  type: number;
  block: Array<Array<BlockValue>>;
  spin: number;
  x: number;
  y: number;
}

const initMatrix = (width: number, height: number) => {
  if (width < 0 || height < 0) return [[]];
  const matrix: Array<Array<BlockValue>> = new Array(height);
  for (let i = 0; i < height; i++) {
    matrix[i] = new Array(width).fill(0);
  }
  return matrix;
}

const getBlockSize = (block: Array<Array<BlockValue>>) => {
  return {
    blockHeight: block.length,
    blockWidth: block.length > 0 ? block[0].length : 0,
  };
}

class Screen extends React.Component<{}, ScreenState> {
  
  constructor(props: any) {
    super(props);
    this.state = {
      started: false,
      timer: null,
      matrix_size: {
        width: 10,
        height: 20,
      },
      matrix: initMatrix(10, 20),
    }
  }

  initBlock() {
    const randomBlock = getBlock();
    this.setState({
      curBlock: {
        x: 0,
        y: Math.floor(Math.random() * (this.state.matrix_size.width - randomBlock.block[0].length)),
        ...randomBlock,
      }
    });
  }

  start() {
    if (this.state.started && this.state.timer) return;
    const timer = setInterval(() => {
      if (!this.state.curBlock) {
        this.initBlock();
      } else {
        this.moveDown();
      }
    }, 500);
    this.setState({ timer, started: true });
  }

  drop() {
    if (!this.state.timer) {
      this.start();
    }
    console.log('drop');
  }

  moveRight() {
    if (!this.state.curBlock) return;
    const { curBlock } = this.state;
    const y = curBlock.y + 1;
    if (this.validate({
      ...curBlock,
      y,
    })) {
      this.setState({
        curBlock: {
          ...curBlock,
          y,
        }
      });
    }
  }

  moveLeft() {
    if (!this.state.curBlock) return;
    const { curBlock } = this.state;
    const y = curBlock.y - 1;
    if (this.validate({
      ...curBlock,
      y,
    })) {
      this.setState({
        curBlock: {
          ...curBlock,
          y,
        }
      });
    }
  }

  moveDown() {
    if (!this.state.curBlock) return;
    const { curBlock } = this.state;
    const x = curBlock.x + 1;
    if (this.validate({
      ...curBlock,
      x,
    })) {
      this.setState({
        curBlock: {
          ...curBlock,
          x,
        },
      });
    } else {
      // update the matrix
      this.updateGameState();
    }
  }

  validate(movedBlock: Block): boolean {
    const { x, y, block } = movedBlock;
    const { blockWidth, blockHeight } = getBlockSize(block);

    if (x < 0 || y < 0 || x + blockHeight > this.state.matrix_size.height || y + blockWidth > this.state.matrix_size.width) {
      return false;
    }
    const { matrix } = this.state;
    
    for (let i = 0; i < blockHeight; i++) {
      for (let j = 0; j < blockWidth; j++) {
        if (matrix[x + i][y + j] && block[i][j]) {
          return false;
        }
      }
    }

    return true;
  }

  updateGameState() {
    if (this.state.curBlock?.x === 0) {
      this.gameOver();
    } else {
      const matrix = this.mergeMatrix();
      if (matrix[matrix.length - 1].reduce((p: number, c) => {
        return p + c;
      }, 0) === this.state.matrix_size.width) {
        const row = matrix.pop();
        if (row) {
          row.fill(0);
          matrix.unshift(row);
        }
      }
      this.setState({
        matrix,
        curBlock: null,
      });
    }
  }

  gameOver() {
    this.pause();
    console.log('game over');
  }

  mergeMatrix(): Array<Array<BlockValue>>{
    if (!this.state.curBlock) return this.state.matrix;
    const { x, y, block } = this.state.curBlock;

    const { blockWidth, blockHeight } = getBlockSize(block);

    const mergedMatrix = JSON.parse(JSON.stringify(this.state.matrix));
    for (let i = 0; i < blockHeight; i++) {
      for (let j = 0; j < blockWidth; j++) {
        mergedMatrix[x + i][y + j] = mergedMatrix[x + i][y + j] || block[i][j];
      }
    }

    return mergedMatrix;
  }

  pause() {
    if (!this.state.started || !this.state.timer) return;
    clearInterval(this.state.timer);
    this.setState({ timer: null });
  }

  restart() {
    this.pause();
    this.setState({
      started: false,
      matrix: initMatrix(this.state.matrix_size.width, this.state.matrix_size.height),
      curBlock: null,
    });
  }

  spin() {
    if (!this.state.curBlock) return;
    const { curBlock } = this.state;
    const spinedBlock = spinBlock(curBlock.block, 1);
    const { blockHeight } = getBlockSize(curBlock.block);
    const { blockHeight: sh } = getBlockSize(spinedBlock);

    if (this.validate({
      ...curBlock,
      x: curBlock.x + blockHeight -sh,
      block: spinedBlock,
    })) {
      this.setState({
        curBlock: {
          ...curBlock,
          block: spinedBlock,
          x: curBlock.x + blockHeight -sh,
          spin: curBlock.spin + 1,
        }
      });
    }
  }

  render() {
    const matrix = this.mergeMatrix();

    return (
      <div className='screen'>
        <Matrix
          className='screen-matrix'
          matrix={matrix}
          blockSize={1}
        />
        <Panel
          className='screen-panel'
          points={0}
          clearedLines={0}
          level={1}
          nextBlock={1}
        />
      </div>
    )
  }

  componentWillUnmount(): void {
    if (this.state.timer) {
      clearInterval(this.state.timer)
    }
  }
};

export default Screen;