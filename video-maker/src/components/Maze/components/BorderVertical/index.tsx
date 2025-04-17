import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import {
  VERTICAL_BORDER_HEIGHT,
  VERTICAL_BORDER_WIDTH,
} from "../../../../constants/sizes";
import { MalleableProps } from "../../../../types/MalleableProps";
import Neon from "../../../Neon";

const BorderVertical = ({ model }: MalleableProps) => {
  const binaries = BINARY_MODEL_BORDER[model];
  const hasLights = binaries[1];
  const className = `${VERTICAL_BORDER_WIDTH} ${VERTICAL_BORDER_HEIGHT}`;

  return <div className={className}>{hasLights ? <Neon /> : null}</div>;
};

export default BorderVertical;
