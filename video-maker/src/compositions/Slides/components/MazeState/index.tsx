import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Maze from "../../../../components/Maze";
import { useRelativeFrame } from "../../../../hooks/useRelativeFrame";
import { Audio, staticFile } from "remotion";

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
  durationInFrames: 220,
  Component: (props: SeqProps) => {
    const relativeFrame = useRelativeFrame(props.from);

    return (
      <DarkSlide name="Maze State" {...props}>
        <Maze data={TRAINING_MAZE} path={[]} />
        <Anchor />
        {relativeFrame > 2 ? <Dot x="25.5%" y="86%" /> : null}
        {relativeFrame > 30 ? <Dot x="68%" y="28%" /> : null}
        {relativeFrame > 60 ? <Dot x="52.5%" y="44.5%" /> : null}
        {relativeFrame > 90 ? <Dot x="28.5%" y="34.5%" /> : null}
        {relativeFrame > 120 ? <Dot x="58.5%" y="70.5%" /> : null}
        <Audio src={staticFile("audio/mazestate.ogg")} />
      </DarkSlide>
    );
  },
};
