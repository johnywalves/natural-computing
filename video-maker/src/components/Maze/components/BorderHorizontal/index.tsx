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
  const className = `${HORIZONTAL_BORDER_WIDTH} ${HORIZONTAL_BORDER_HEIGHT}`;

  return <div className={className}>{hasLights ? <Neon /> : null}</div>;
};

export default BorderHorizontal;
