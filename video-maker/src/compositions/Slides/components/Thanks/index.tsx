import { Chapter, DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";

export const ThanksSequence = {
  durationInFrames: 320,
  Component: (props: SeqProps) => {
    return (
      <DarkSlide name="Thanks" {...props}>
        <Chapter text="Obrigado" subtitle="Johny W. Alves" />
      </DarkSlide>
    );
  },
};
