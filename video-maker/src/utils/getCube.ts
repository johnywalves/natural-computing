import criarMatrizIdentidade from "./criarMatrizIdentidade";
import multiplicarMatrizes from "./multiplicarMsatrizes";

const getCube = (list: Array<number>) => {
  const dimension = Math.sqrt(list.length);
  const cube: Array<Array<number>> = [];

  for (let i = 0; i < dimension; i++) {
    cube[i] = [];
    for (let j = 0; j < dimension; j++) {
      cube[i][j] = list[i * 16 + j];
    }
  }

  const identity = criarMatrizIdentidade(dimension);
  const result = multiplicarMatrizes(cube, identity);

  return result;
};

export default getCube;
