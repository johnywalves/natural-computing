import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";

export const BookSequence = {
  durationInFrames: 320,
  Component: (props: SeqProps) => {
    return <DarkSlide name="Book" {...props}></DarkSlide>;
  },
};
