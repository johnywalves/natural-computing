import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import {
  HORIZONTAL_BORDER_HEIGHT,
  HORIZONTAL_BORDER_WIDTH,
} from "../../../../constants/sizes";
import { MalleableProps } from "../../../../types/MalleableProps";
import Neon from "../../../Neon";

const BorderHorizontal = ({ model }: MalleableProps) => {
  const binaries = BINARY_MODEL_BORDER[model];
  const hasLights = binaries[2];

  return (
    <div style={{ ...HORIZONTAL_BORDER_WIDTH, ...HORIZONTAL_BORDER_HEIGHT }}>
      {hasLights ? <Neon /> : null}
    </div>
  );
};

export default BorderHorizontal;
