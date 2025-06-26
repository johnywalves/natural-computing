import { Source } from "../../../../components/Source";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Audio, OffthreadVideo, staticFile } from "remotion";

export const BOSTON_START_TIME = 0;
export const BOSTON_FINISH_TIME = 350;

export const BostonDynamicsSequence = {
  durationInFrames: BOSTON_FINISH_TIME - BOSTON_START_TIME,
  Component: (props: SeqProps) => (
    <DarkSlide name="Boston" {...props}>
      <OffthreadVideo
        className="h-[95%]"
        startFrom={BOSTON_START_TIME}
        endAt={BOSTON_FINISH_TIME}
        src={staticFile("boston.mp4")}
      />
      <Audio src={staticFile("audio/boston.ogg")} />
      <Source text="https://www.youtube.com/watch?v=I44_zbEwz_w&t=3s&ab_channel=BostonDynamics" />
    </DarkSlide>
  ),
};
