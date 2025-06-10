import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { OffthreadVideo, staticFile } from "remotion";

const Component = (props: SeqProps) => (
  <DarkSlide {...props}>
    <OffthreadVideo
      className="h-[95%]"
      startFrom={280}
      endAt={860}
      src={staticFile("micro-mouse.mp4")}
    />
    <Anchor />
  </DarkSlide>
);

export const MicroMouseSequence = {
  durationInFrames: 19 * 30,
  Component,
};
