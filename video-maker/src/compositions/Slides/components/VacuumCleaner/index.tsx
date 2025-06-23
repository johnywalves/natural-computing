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
      endAt={600}
      src={staticFile("vacuum_cleaner.mp4")}
    />
    <Anchor />
  </DarkSlide>
);

export const VacuumCleaner = {
  durationInFrames: FINISH_TIME - START_TIME,
  Component,
};
