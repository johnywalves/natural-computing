export type PathPros = {
  x: number;
  y: number;
  count: number;
  stopCount: number;
};

export type MazeProps = {
  data: Array<number>;
  path: Array<PathPros>;
};
