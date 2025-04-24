import { Sequence } from "remotion";
import { MicroMouseRandom } from "./sequences/random";

export const MicroMouse = () => {
  return (
    <Sequence durationInFrames={30}>
      <MicroMouseRandom />
    </Sequence>
  );
};
