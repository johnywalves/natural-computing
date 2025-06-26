import { Img, staticFile } from "remotion";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";

export const BookSequence = {
  durationInFrames: 320,
  Component: (props: SeqProps) => {
    return (
      <DarkSlide name="Book" {...props}>
        <Img src={staticFile("book.jpg")} alt="" className="w-6xl" />
        <Anchor />
      </DarkSlide>
    );
  },
};
