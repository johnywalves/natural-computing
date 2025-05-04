import { Fragment } from "react/jsx-runtime";
import Line from "./components/Line";
import { LINE_BLOCK_HEIGHT } from "../../constants/sizes";
import BorderVertical from "./components/BorderVertical";
import { NEUTRAL_LINE_MODEL, NEUTRAL_MODEL } from "../../constants/models";
import { MazeProps } from "./components/types";
import BorderLine from "./components/BorderLine";
import mapPath from "../../utils/mapPath";
import { useCurrentFrame } from "remotion";
import Block from "./components/Block";

const Maze = ({ data, path }: MazeProps) => {
  const mazeScheme = mapPath({ data, path });
  const frame = useCurrentFrame();

  return (
    <div className={`h-full aspect-square bg-[#222]`}>
      <BorderLine line={NEUTRAL_LINE_MODEL} />

      {mazeScheme.map((line, y) => (
        <Fragment key={`line-${y + 1}`}>
          <Line height={LINE_BLOCK_HEIGHT}>
            <BorderVertical model={NEUTRAL_MODEL} />

            {line.map(({ name, model, fnMouse, fnPath }) => (
              <Fragment key={name}>
                <Block mouse={fnMouse(frame)} path={fnPath(frame)} />
                <BorderVertical model={model} />
              </Fragment>
            ))}
          </Line>

          <BorderLine line={line} />
        </Fragment>
      ))}
    </div>
  );
};

export default Maze;
