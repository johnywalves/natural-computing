import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import {
  VERTICAL_BORDER_HEIGHT,
  VERTICAL_BORDER_WIDTH,
} from "../../../../constants/sizes";
import { MalleableProps } from "../../../../types/MalleableProps";

const BorderVertical = ({ model }: MalleableProps) => {
  const binaries = BINARY_MODEL_BORDER[model];
  const background = binaries[1] ? "bg-amber-700" : "";
  const className = `${VERTICAL_BORDER_WIDTH} ${VERTICAL_BORDER_HEIGHT} ${background}`;

  return <div className={className} />;
};

export default BorderVertical;
