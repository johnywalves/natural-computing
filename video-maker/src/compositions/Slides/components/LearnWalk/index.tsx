import { Source } from "../../../../components/Source";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Audio, OffthreadVideo, staticFile } from "remotion";

export const LearnWalkSequence = {
  durationInFrames: 20 * 30,
  Component: (props: SeqProps) => (
    <DarkSlide name="Learn Walk" {...props}>
      <OffthreadVideo
        className="h-[95%]"
        startFrom={1500}
        endAt={2100}
        volume={0}
        src={staticFile("learnwalk.mp4")}
      />
      <Audio src={staticFile("audio/learnwalk.ogg")} />
      <Source text="https://www.youtube.com/watch?v=kQ2bqz3HPJE&t=58s&ab_channel=TwoMinutePapers" />
    </DarkSlide>
  ),
};
