import { LAST_STEPS } from "../constants/config";
import { MazeProps } from "../components/Maze/components/types";
import { MalleableProps } from "../types/MalleableProps";
import { MappedType } from "../types/MappedType";
import getCube from "./getCube";

const mapPath = ({ data, path }: MazeProps) => {
  const cube = getCube(data);

  const pathTaken = path.map(({ x, y }) => `${x},${y}`);

  return cube.map((line, x) => {
    return line.map((item, y) => {
      const posX = Math.abs(x - 15);
      const posY = y;
      const posStr = `${posX},${posY}`;

      const mouseOpacity = (delta: number) => {
        const moment = Math.ceil(delta) ?? 0;
        const list = pathTaken.slice(0, moment + 1);

        const posLast = list[list.length - 1];
        const isLast = posLast === posStr;

        return isLast ? 1 : 0;
      };

      const pathOpacity = (delta: number) => {
        const moment = Math.ceil(delta) ?? 0;
        const list = pathTaken.slice(0, moment);

        const currentIndex = list.lastIndexOf(posStr);
        const retroIndex = list.length - 1 - currentIndex;
        const inRange = currentIndex !== -1;
        const prevIndex = currentIndex < moment;

        if (inRange && prevIndex && retroIndex < LAST_STEPS) {
          return 1 - retroIndex / LAST_STEPS;
        }

        return 0;
      };

      return {
        pos: { x: posX, y: posY },
        name: `position-${posX}-${posY}`,
        model: item as MalleableProps["curModel"],
        fnMouse: mouseOpacity,
        fnPath: pathOpacity,
      } as MappedType;
    });
  });
};

export default mapPath;
