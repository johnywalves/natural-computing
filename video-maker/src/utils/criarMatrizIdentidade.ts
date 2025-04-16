// Função para criar uma matriz identidade de tamanho n x n
const criarMatrizIdentidade = (n: number) => {
  const identidade: Array<Array<number>> = [];
  for (let i = 0; i < n; i++) {
    identidade[i] = [];
    for (let j = 0; j < n; j++) {
      identidade[i][j] = i === j ? 1 : 0;
    }
  }
  return identidade;
};

export default criarMatrizIdentidade;
