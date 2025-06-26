import { Source } from "../../../../components/Source";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { OffthreadVideo, staticFile } from "remotion";

export const MICRO_MOUSE_START_TIME = 280;
export const MICRO_MOUSE_FINISH_TIME = 600;

const MICRO_MOUSE_DURATION = MICRO_MOUSE_FINISH_TIME - MICRO_MOUSE_START_TIME;
const SLOP_AUDIO = 30;

export const MicroMouseSequence = {
  durationInFrames: MICRO_MOUSE_DURATION,
  Component: (props: SeqProps) => (
    <DarkSlide name="Micro Mouse" {...props}>
      <OffthreadVideo
        className="h-[95%]"
        startFrom={MICRO_MOUSE_START_TIME}
        endAt={MICRO_MOUSE_FINISH_TIME}
        volume={(frame) => {
          const relativeFrame = frame - (props.from ?? 0);

          if (MICRO_MOUSE_DURATION - SLOP_AUDIO > relativeFrame) {
            return 0.5;
          }

          return (0.5 * (MICRO_MOUSE_DURATION - SLOP_AUDIO)) / SLOP_AUDIO;
        }}
        src={staticFile("micro_mouse.mp4")}
      />
      <Source text="https://www.youtube.com/watch?v=CLwICJKV4dw&t=21s&ab_channel=JUING-HUEI" />
    </DarkSlide>
  ),
};
