import { Fragment } from "react/jsx-runtime";
import getCube from "../../utils/getCube";
import Block from "./components/Block";
import Line from "./components/Line";
import { LINE_BLOCK_HEIGHT } from "../../constants/sizes";
import { MalleableProps } from "../../types/MalleableProps";
import BorderVertical from "./components/BorderVertical";
import { NEUTRAL_LINE_MODEL, NEUTRAL_MODEL } from "../../constants/models";
import { MazeProps } from "./components/types";
import BorderLine from "./components/BorderLine";
import mapPath from "../../utils/mapPath";
import { useCurrentFrame } from "remotion";

const Maze = ({ data, path }: MazeProps) => {
  const frame = useCurrentFrame();

  const cube = getCube(data);
  const { mousePosition, pathTaken } = mapPath(path);

  return (
    <div className={`h-full aspect-square bg-[#222]`}>
      <BorderLine line={NEUTRAL_LINE_MODEL} />

      {cube.map((line, y) => (
        <Fragment key={`line-${y + 1}`}>
          <Line height={LINE_BLOCK_HEIGHT}>
            <BorderVertical model={NEUTRAL_MODEL} />

            {line.map((item, x) => {
              const [posX, posY] = mousePosition;
              const posStr = `${x},${y}`;

              const mouseOpacity = posX === x && posY === y ? 1 : 0;
              const pathOpacity = pathTaken.indexOf(posStr) !== -1 ? 1 : 0;

              return (
                <Fragment key={`pos-${x}-${y}`}>
                  <Block mouse={mouseOpacity} path={pathOpacity} />
                  <BorderVertical model={item as MalleableProps["model"]} />
                </Fragment>
              );
            })}
          </Line>

          <BorderLine line={line} />
        </Fragment>
      ))}
    </div>
  );
};

export default Maze;
