import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { textNeonStyle } from "../../../../utils/stylesFunctions";
import { TEXT_SLIDE } from "../../../../constants/colors";
import { Audio, staticFile } from "remotion";

export const EquationRevealSequence = {
  durationInFrames: 280,
  Component: (props: SeqProps) => (
    <DarkSlide name="Equation Reveals" {...props}>
      <div className="flex flex-col gap-2">
        <p
          className="text-[6rem] text-center mb-16"
          style={textNeonStyle(TEXT_SLIDE)}
        >
          Q'<sub>(s,a)</sub> = Q<sub>(s,a)</sub> + &alpha; * (R + &gamma; * max
          [Q<sub>(s',a)</sub>])
        </p>
      </div>
      <Anchor />
      <Audio src={staticFile("audio/equation-reveal.ogg")} />
    </DarkSlide>
  ),
};
