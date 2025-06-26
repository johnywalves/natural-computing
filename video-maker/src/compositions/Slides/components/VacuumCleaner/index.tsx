import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { Source } from "../../../../components/Source";
import { Audio, OffthreadVideo, staticFile } from "remotion";

const START_TIME = 280;
const FINISH_TIME = 670;

const Component = (props: SeqProps) => (
  <DarkSlide name="Vacuum Cleaner" {...props}>
    <OffthreadVideo
      className="h-[95%]"
      startFrom={START_TIME}
      endAt={FINISH_TIME}
      volume={0.25}
      src={staticFile("vacuum_cleaner.mp4")}
    />
    <Anchor />
    <Source text="https://www.tiktok.com/@stanleythestanman/video/7314441663605230879" />
    <Audio src={staticFile("audio/vacuum.ogg")} />
  </DarkSlide>
);

export const VacuumCleaner = {
  durationInFrames: FINISH_TIME - START_TIME,
  Component,
};
