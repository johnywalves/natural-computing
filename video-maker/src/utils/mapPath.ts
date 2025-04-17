import { MazeProps } from "../components/Maze/components/types";

const mapPath = (path: MazeProps["path"]) => {
  const mapped = path.map((item) => [item[0], Math.abs(item[1] - 15)]);

  const mousePosition = mapped[0];
  const pathTaken = mapped.slice(1).map((item) => `${item[0]},${item[1]}`);

  return { mousePosition, pathTaken };
};

export default mapPath;
