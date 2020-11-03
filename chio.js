//auhtor:Mustafa Hasan kuzulu
// github/coderSau/chio

const resultElement = document.getElementById("result");

// matrix columns
let matrix = [
  [8, 1, 2, 1],
  [8, 26, 5, 7],
  [25, 4, 7, 5],
  [5, 5, 5, 9],
];
//started by 1 because of multiply
let result = 1;

var CreateMatrix = function (rows, columns) {
  this.rows = rows;
  this.columns = columns;
  this.myarray = new Array(this.rows);
  for (var i = 0; i < this.columns; i += 1) {
    this.myarray[i] = new Array(this.rows);
  }
  return this.myarray;
};

var getDetarminant = function (array) {
  return array[0] * array[3] - array[1] * array[2];
};

var SolveMatrix = function (solveMatrix) {
  const solveMatrixLength = solveMatrix.length;
  const newMatrix = CreateMatrix(solveMatrixLength, solveMatrixLength);
  for (var i = 0; i < solveMatrixLength; i++) {
    for (var j = 0; j < solveMatrixLength; j++) {
      newMatrix[j][i] = getDetarminant(solveMatrix[i][j]);
    }
  }
  return newMatrix;
};

function calculateDeterminant(matrix2) {
  if (matrix2.length == 1) {
    resultElement.innerText = result * matrix2[0] * -1;
    return;
  } else {
    let calculateMatrix = matrix2;
    const matrixLength = calculateMatrix.length;
    //check for the first element
    if (calculateMatrix[0][0] === 0) {
      for (var i = 1; i < matrix2.length; i++) {
        //after the change brak the for loop
        if (calculateMatrix[i][0] !== 0) {
          const saveFirst = calculateMatrix[0];
          calculateMatrix[0] = calculateMatrix[i];
          calculateMatrix[i] = saveFirst;
          result *= -1;
          break;
        }
      }
    }
    let takeChoiMultiplier =
      1 / Math.pow(calculateMatrix[0][0], matrixLength - 2);
    result *= takeChoiMultiplier;
    const newMatrixLength = matrixLength - 1;
    let newMatrix = CreateMatrix(newMatrixLength, newMatrixLength);

    for (var i = 0; i < newMatrixLength; i++) {
      for (var j = 1; j < newMatrixLength + 1; j++) {
        newMatrix[i][j - 1] = [
          calculateMatrix[0][0],
          calculateMatrix[0][i + 1],
          calculateMatrix[j][0],
          calculateMatrix[j][i + 1],
        ];
      }
    }

    const underDimentionalMatrix = SolveMatrix(newMatrix);

    calculateDeterminant(underDimentionalMatrix);
  }
}
calculateDeterminant(matrix);
