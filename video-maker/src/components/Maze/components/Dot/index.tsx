import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import {
  HORIZONTAL_BORDER_HEIGHT,
  VERTICAL_BORDER_WIDTH,
} from "../../../../constants/sizes";
import { MalleableProps } from "../../../../types/MalleableProps";
import Neon from "../../../Neon";

const Dot = ({ model }: MalleableProps) => {
  const binaries = BINARY_MODEL_BORDER[model];
  const hasLights = binaries[0] || binaries[1] || binaries[2];

  return (
    <div style={{ ...VERTICAL_BORDER_WIDTH, ...HORIZONTAL_BORDER_HEIGHT }}>
      {hasLights ? <Neon /> : null}
    </div>
  );
};

export default Dot;
