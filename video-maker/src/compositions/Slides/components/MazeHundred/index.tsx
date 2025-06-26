import { useCurrentFrame } from "remotion";
import { SeqProps } from "../../../../compositions/Slides/types";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Manifesto from "../../../../paths/manifesto.json";
import { mappingManifest } from "../../../../utils/mappingManifest";
import { DarkSlide } from "../../../../components/Slide";
import Maze from "../../../../components/Maze";
import { Anchor } from "../../../../components/Anchor";
import Statistics from "../../../../components/Maze/components/Statistics";

const NUMBER_EPISODIE = 100;

const HUNDRED_EPISODE = Manifesto.map(mappingManifest)[NUMBER_EPISODIE - 1];

const Component = (props: SeqProps) => {
  const frame = useCurrentFrame();

  return (
    <DarkSlide name="Maze Thirty" {...props}>
      <Statistics
        episode={NUMBER_EPISODIE}
        path={HUNDRED_EPISODE.path}
        histogram={HUNDRED_EPISODE.histogram}
      />
      <Maze data={TRAINING_MAZE} path={HUNDRED_EPISODE.path} />
      {frame - (props.from ?? 0) > 50 ? <Anchor /> : null}
    </DarkSlide>
  );
};

export const MazeHundredSequence = {
  durationInFrames: 690,
  Component,
};
