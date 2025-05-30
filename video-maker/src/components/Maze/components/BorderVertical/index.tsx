import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import {
  VERTICAL_BORDER_HEIGHT,
  VERTICAL_BORDER_WIDTH,
} from "../../../../constants/sizes";
import Neon from "../../../Neon";
import { BorderVerticalProps } from "./types";

const BorderVertical = ({ model }: BorderVerticalProps) => {
  const binaries = BINARY_MODEL_BORDER[model];
  const hasLights = binaries[1];

  return (
    <div style={{ ...VERTICAL_BORDER_WIDTH, ...VERTICAL_BORDER_HEIGHT }}>
      {hasLights ? <Neon /> : null}
    </div>
  );
};

export default BorderVertical;
