export type PathPros = {
  x: number;
  y: number;
  count: number;
};

export type MazeProps = {
  data: Array<number>;
  path: Array<PathPros>;
};
