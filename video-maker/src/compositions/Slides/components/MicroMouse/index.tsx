import { Source } from "../../../../components/Source";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { OffthreadVideo, staticFile } from "remotion";

export const MICRO_MOUSE_START_TIME = 280;
export const MICRO_MOUSE_FINISH_TIME = 600;

const Component = (props: SeqProps) => (
  <DarkSlide {...props}>
    <OffthreadVideo
      className="h-[95%]"
      startFrom={MICRO_MOUSE_START_TIME}
      endAt={MICRO_MOUSE_FINISH_TIME}
      src={staticFile("micro_mouse.mp4")}
    />
    <Source text="https://www.youtube.com/watch?v=CLwICJKV4dw&t=21s&ab_channel=JUING-HUEI" />
  </DarkSlide>
);

export const MicroMouseSequence = {
  durationInFrames: MICRO_MOUSE_FINISH_TIME - MICRO_MOUSE_START_TIME,
  Component,
};
