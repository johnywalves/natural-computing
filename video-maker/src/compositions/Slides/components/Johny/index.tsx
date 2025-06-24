import { Audio, Img, staticFile } from "remotion";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";

export const JohnySequence = {
  durationInFrames: 360,
  Component: (props: SeqProps) => (
    <DarkSlide name="Johny" {...props}>
      <Img src={staticFile("johnywalves.jpg")} alt="" className="w-full" />
      <Anchor />
      <Audio src={staticFile("audio/johny.opus")} />
    </DarkSlide>
  ),
};
