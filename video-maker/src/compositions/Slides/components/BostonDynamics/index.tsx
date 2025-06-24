import { Source } from "../../../../components/Source";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { OffthreadVideo, staticFile } from "remotion";

export const BostonDynamicsSequence = {
  durationInFrames: 60 * 30,
  Component: (props: SeqProps) => (
    <DarkSlide name="Boston" {...props}>
      <OffthreadVideo className="h-[95%]" src={staticFile("boston.mp4")} />

      <Source text="https://www.youtube.com/watch?v=I44_zbEwz_w&t=3s&ab_channel=BostonDynamics" />
    </DarkSlide>
  ),
};
