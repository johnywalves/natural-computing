import { MazeProps } from "../components/Maze/components/types";
import { MalleableProps } from "../types/MalleableProps";
import { MappedType } from "../types/MappedType";
import getCube from "./getCube";

const mapPath = ({ data, path }: MazeProps) => {
  const cube = getCube(data);

  const pathTaken = path
    .map((item) => [item[0], Math.abs(item[1] - 15)])
    .map((item) => `${item[0]},${item[1]}`);

  return cube.map((line, y) => {
    return line.map((item, x) => {
      const posStr = `${x},${y}`;

      const mouseOpacity = (delta: number) => {
        const { length } = pathTaken;
        const currentIndex = pathTaken.indexOf(posStr);

        const inRange = currentIndex !== -1;
        const curIndex = currentIndex === delta;
        const afterIndex = length <= delta && pathTaken[length - 1] === posStr;

        return inRange && (curIndex || afterIndex) ? 1 : 0;
      };

      const pathOpacity = (delta: number) => {
        const currentIndex = pathTaken.indexOf(posStr);

        const inRange = currentIndex !== -1;
        const prevIndex = currentIndex < delta;

        if (inRange && prevIndex && !mouseOpacity(delta)) {
          if (currentIndex > delta - 5) {
            return 1;
          }

          return currentIndex / (delta / 2);
        }

        return 0;
      };

      return {
        name: `pos-${x}-${y}`,
        model: item as MalleableProps["model"],
        fnMouse: mouseOpacity,
        fnPath: pathOpacity,
      } as MappedType;
    });
  });
};

export default mapPath;
