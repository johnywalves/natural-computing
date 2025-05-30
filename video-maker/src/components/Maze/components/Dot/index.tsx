import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import {
  HORIZONTAL_BORDER_HEIGHT,
  VERTICAL_BORDER_WIDTH,
} from "../../../../constants/sizes";
import { MalleableProps } from "../../../../types/MalleableProps";
import Neon from "../../../Neon";

const Dot = ({ curModel, nextModel }: MalleableProps) => {
  const curWall = BINARY_MODEL_BORDER[curModel];
  const nextWall = BINARY_MODEL_BORDER[nextModel];
  const hasLights = curWall[1] || curWall[2] || nextWall[2] || nextWall[3];

  return (
    <div style={{ ...VERTICAL_BORDER_WIDTH, ...HORIZONTAL_BORDER_HEIGHT }}>
      {hasLights ? <Neon /> : null}
    </div>
  );
};

export default Dot;
