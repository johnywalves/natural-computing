import { MazeProps } from "../components/Maze/components/types";
import girar90Esquerda from "./girar90Esquerda";

const getCube = (list: MazeProps["data"]) => {
  const dimension = Math.sqrt(list.length);
  const cube: Array<Array<number>> = [];

  for (let i = 0; i < dimension; i++) {
    cube[i] = [];
    for (let j = 0; j < dimension; j++) {
      cube[i][j] = list[i * 16 + j];
    }
  }

  return girar90Esquerda(cube);
};

export default getCube;
