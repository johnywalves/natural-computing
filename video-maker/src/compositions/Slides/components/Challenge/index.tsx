import { Source } from "../../../../components/Source";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { Audio, OffthreadVideo, staticFile } from "remotion";
import { MICRO_MOUSE_FINISH_TIME } from "../MicroMouse";

const Component = (props: SeqProps) => {
  return (
    <DarkSlide name="Challenge" {...props}>
      <OffthreadVideo
        className="h-[95%]"
        startFrom={MICRO_MOUSE_FINISH_TIME}
        src={staticFile("micro_mouse.mp4")}
        muted
      />
      <Anchor />
      <Audio src={staticFile("audio/micro_mouse.ogg")} />
      <Source text="https://www.youtube.com/watch?v=CLwICJKV4dw&t=21s&ab_channel=JUING-HUEI" />
    </DarkSlide>
  );
};

export const ChallengeSequence = {
  durationInFrames: 520,
  Component,
};
