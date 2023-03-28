class Node {
  constructor(value, parent) {
    this.value = value;
    this.parent = parent;
  }
};

const gameboard = [];

for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    gameboard.push([i, j]);
  }
}

const isInArray = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === target[0] && arr[i][1] === target[1]) return true;
  }
  return false;
};

const findNeighbors = (square) => {
  let neighbors = [];
  const moves = [[-2, 1], [-1, 2], [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1]];

  moves.forEach(m => {
    let movedSquare = [square[0] + m[0], square[1] + m[1]];
    if (movedSquare[0] < 8 && movedSquare[0] >= 0 && movedSquare[1] < 8 && movedSquare[1] >= 0) {
      neighbors.push(movedSquare);
    }
  });

  return neighbors;
};

const createGraph = () => {
  let result = {};
  gameboard.forEach(e => {
    result[e] = findNeighbors(e);
  });
  return result;
};

const movesGraph = createGraph();

const knightMoves = (start, target) => {

  const addtoQueue = (q, moves, root) => {
    moves.forEach(m => {
      let node = new Node(m, root);
      q.push(node);
    });
  };

  const constructPath = (node, path) => {
    if (node === null) return;

    path.push(node.value);
    constructPath(node.parent, path);
  };

  let queue = [new Node(start, null)];

  while (queue.length > 0) {
    let root = queue.shift();

    if (root.value[0] === target[0] && root.value[1] === target[1]) {
      let path = [];
      constructPath(root, path);
      return path.reverse();
    }

    addtoQueue(queue, movesGraph[root.value], root);
  }
};

console.log(knightMoves([0, 0], [1, 2]));
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([1, 2], [7, 7]));
