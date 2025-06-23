import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { OffthreadVideo, staticFile } from "remotion";

const START_TIME = 280;
const FINISH_TIME = 600;

const Component = (props: SeqProps) => (
  <DarkSlide {...props}>
    <OffthreadVideo
      className="h-[95%]"
      startFrom={280}
      endAt={860}
      src={staticFile("micro_mouse.mp4")}
    />
    <Anchor />
  </DarkSlide>
);

export const MicroMouseSequence = {
  durationInFrames: FINISH_TIME - START_TIME,
  Component,
};
