import { Matrix } from 'https://deno.land/x/math@v1.1.0/mod.ts';

export const shuffle = (matrix1: Matrix, matrix2: Matrix): Matrix[] => {
    const [rows, cols] = matrix1.shape;
    const res: Matrix[] = [];
    let randIndex: number, temp1: any, temp2: any;
    let index = cols;
  
    while (index) {
      randIndex = Math.floor(Math.random() * index);
      index -= 1;
      temp1 = matrix1.matrix[0][index]
      temp2 = matrix2.matrix[0][index]
      matrix1.matrix[0][index] = matrix1.matrix[0][randIndex]
      matrix2.matrix[0][index] = matrix2.matrix[0][randIndex]
      matrix1.matrix[0][randIndex] = temp1;
      matrix2.matrix[0][randIndex] = temp2;
    }
  
    res.push(matrix1, matrix2)
    return res;
  }
  
  export const createMiniBatches = (matrix: Matrix, chunk: number): Matrix[] => {
    const [rows, cols] = matrix.shape;
    const res = [];
    let temp = [];
  
    for (let i = 0; i < rows; i += chunk) {
      temp = matrix.valueOf().slice(i, i + chunk)
      res.push(new Matrix(temp));
    }
    return res;
  }
