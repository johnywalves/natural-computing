import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import {
  HORIZONTAL_BORDER_HEIGHT,
  HORIZONTAL_BORDER_WIDTH,
} from "../../../../constants/sizes";
import { MalleableProps } from "../../../../types/MalleableProps";

const BorderHorizontal = ({ model }: MalleableProps) => {
  const binaries = BINARY_MODEL_BORDER[model];
  const background = binaries[2] ? "bg-amber-700" : "";
  const className = `${HORIZONTAL_BORDER_WIDTH} ${HORIZONTAL_BORDER_HEIGHT} ${background}`;

  return <div className={className} />;
};

export default BorderHorizontal;
