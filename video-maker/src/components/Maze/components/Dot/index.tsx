import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import {
  HORIZONTAL_BORDER_HEIGHT,
  VERTICAL_BORDER_WIDTH,
} from "../../../../constants/sizes";
import { MalleableProps } from "../../../../types/MalleableProps";

const Dot = ({ model }: MalleableProps) => {
  const binaries = BINARY_MODEL_BORDER[model];
  const background = binaries[1] && binaries[2] ? "bg-amber-700" : "";
  const className = `${VERTICAL_BORDER_WIDTH} ${HORIZONTAL_BORDER_HEIGHT} ${background}`;

  return <div className={className} />;
};

export default Dot;
