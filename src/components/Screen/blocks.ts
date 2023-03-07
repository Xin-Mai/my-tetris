export type BlockValue = 0 | 1;

export const blocks: Array<Array<Array<BlockValue>>> = [
  [
    [1, 1, 0],
    [0, 1, 1],
  ],
  [
    [1, 1],
    [1, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
  ],
  [
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 1, 1],
  ]
];

export const spinBlock = (block: Array<Array<BlockValue>>, spin: number) => {
  if (block.length <= 0) return [[]];
  spin %= 4;
  let oldBlock = JSON.parse(JSON.stringify(block)).reverse();
  let newBlock: Array<Array<BlockValue>> = block;
  for (let counter = 0; counter < spin; counter++) {
    const row = oldBlock[0].length;
    const col = oldBlock.length;
    newBlock = new Array(row);

    for (let i = 0; i < row; i++) {
      const newRow = new Array(col);
      for (let j = 0; j < col; j++) {
        newRow[j] = oldBlock[j][i];
      }
      newBlock[i] = newRow;
    }
    oldBlock = JSON.parse(JSON.stringify(newBlock)).reverse();
  }
  return newBlock;
}

const getAxisymmetricalBlock = (block: Array<Array<BlockValue>>, axis: number = 0) => {
  axis %= 2;
  // debugger
  let newBlock: Array<Array<BlockValue>> = block; 
  if (axis) {
    newBlock = block.reverse();
  } else {
    newBlock = block.map(v => v.reverse());
  }

  return newBlock;
}

export const getBlock = (type?: number, spin?: number, asym?: number) => {
  if (type !== undefined) {
    type %= blocks.length;
  } else {
    type = Math.floor(Math.random() * blocks.length);
  }

  let block = blocks[type];

  if (spin !== undefined) {
    spin %= 4;
  } else {
    spin = Math.floor(Math.random() * 4);
  }

  block = spinBlock(block, spin);
  // 0, no asym
  if (asym === undefined) {
    asym = Math.floor(Math.random() * 3);
  }
  if (asym > 0) {
    block = getAxisymmetricalBlock(block, asym);
  }
  
  return {
    type,
    spin,
    block,
  };
}