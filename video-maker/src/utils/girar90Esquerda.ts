function girar90Esquerda(matriz: Array<Array<number>>) {
  if (matriz.length === 0) return []; // Caso a matriz esteja vazia

  const linhas = matriz.length;
  const colunas = matriz[0].length;
  const matrizGirada = [];

  // Percorre as colunas originais de trás para frente
  for (let j = colunas - 1; j >= 0; j--) {
    const novaLinha = [];
    // Percorre as linhas originais na ordem normal
    for (let i = 0; i < linhas; i++) {
      novaLinha.push(matriz[i][j]);
    }
    matrizGirada.push(novaLinha);
  }

  return matrizGirada;
}

export default girar90Esquerda;
