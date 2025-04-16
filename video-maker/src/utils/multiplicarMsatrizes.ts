// Função para multiplicar duas matrizes
const multiplicarMatrizes = (
  matrizA: Array<Array<number>>,
  matrizB: Array<Array<number>>,
) => {
  const linhasA = matrizA.length;
  const colunasA = matrizA[0].length;
  const linhasB = matrizB.length;
  const colunasB = matrizB[0].length;

  if (colunasA !== linhasB) {
    throw new Error("Dimensões incompatíveis para multiplicação de matrizes");
  }

  const resultado: Array<Array<number>> = [];
  for (let i = 0; i < linhasA; i++) {
    resultado[i] = [];
    for (let j = 0; j < colunasB; j++) {
      let soma = 0;
      for (let k = 0; k < colunasA; k++) {
        soma += matrizA[i][k] * matrizB[k][j];
      }
      resultado[i][j] = soma;
    }
  }
  return resultado;
};

export default multiplicarMatrizes;
