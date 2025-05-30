import { HTMLProps } from "react";
import { BINARY_MODEL_BORDER } from "../../../../constants/models";
import {
  HORIZONTAL_BORDER_HEIGHT,
  HORIZONTAL_BORDER_WIDTH,
} from "../../../../constants/sizes";
import { MalleableProps } from "../../../../types/MalleableProps";
import Neon from "../../../Neon";

const BorderHorizontal = ({
  curModel,
  ...rest
}: MalleableProps & HTMLProps<HTMLDivElement>) => {
  const binaries = BINARY_MODEL_BORDER[curModel];
  const hasLights = binaries[2];

  return (
    <div
      {...rest}
      style={{ ...HORIZONTAL_BORDER_WIDTH, ...HORIZONTAL_BORDER_HEIGHT }}
    >
      {hasLights ? <Neon /> : null}
    </div>
  );
};

export default BorderHorizontal;
