import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Maze from "../../../../components/Maze";
import { Audio, staticFile } from "remotion";
import { Highlight } from "../../../../components/Highlight";
import { useRelativeFrame } from "../../../../hooks/useRelativeFrame";

const Component = (props: SeqProps) => {
  const relativeFrame = useRelativeFrame(props.from);

  return (
    <DarkSlide name="Environment" {...props}>
      <Maze data={TRAINING_MAZE} path={[]} />
      <Anchor />
      {relativeFrame > 170 ? <Highlight x="24%" y="84%" /> : null}
      {relativeFrame > 210 ? <Highlight x="46.75%" y="45%" /> : null}
      <Audio src={staticFile("audio/maze.ogg")} />
    </DarkSlide>
  );
};

export const EnvironmentSequence = {
  durationInFrames: 340,
  Component,
};
