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
        const moment = Math.ceil(delta) ?? 0;

        const { length } = pathTaken;
        const posLast = pathTaken[length - 1];
        const posDelta = pathTaken[moment];

        const outRange = length < moment;
        const isLast = posLast === posStr;
        const isDelta = posDelta === posStr;

        return isDelta || (outRange && isLast) ? 1 : 0;
      };

      const pathOpacity = (delta: number) => {
        const moment = Math.ceil(delta) ?? 0;
        const list = pathTaken.slice(0, moment);

        const currentIndex = list.lastIndexOf(posStr);

        const inRange = currentIndex !== -1;
        const prevIndex = currentIndex < moment;

        if (inRange && prevIndex) {
          if (currentIndex > moment - 5) {
            return 1;
          }

          return currentIndex / delta;
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
