import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Maze from "../../../../components/Maze";
import { useCurrentFrame } from "remotion";

const Dot = ({ x, y }: { x: string; y: string }) => {
  return (
    <div
      className="absolute w-18 h-18 bg-[#8ae013] rounded-[50%]"
      style={{
        left: x,
        top: y,
        filter: "drop-shadow(0 0 32px #8ae013)",
      }}
    />
  );
};

export const MazeStateSequence = {
  durationInFrames: 510,
  Component: (props: SeqProps) => {
    const frame = useCurrentFrame();
    const relativeFrame = frame - (props.from ?? 0);

    return (
      <DarkSlide name="Maze State" {...props}>
        <Maze data={TRAINING_MAZE} path={[]} />
        <Anchor />
        <Dot x="25.5%" y="86%" />
        <Dot x="68%" y="28%" />
        <Dot x="52.5%" y="44.5%" />

        {relativeFrame > 150 ? <Dot x="24%" y="84%" /> : null}
        {relativeFrame > 170 ? <Dot x="46.75%" y="45%" /> : null}
      </DarkSlide>
    );
  },
};
