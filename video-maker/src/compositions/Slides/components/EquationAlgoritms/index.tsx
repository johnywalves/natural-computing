import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { textNeonStyle } from "../../../../utils/stylesFunctions";
import { TEXT_SLIDE } from "../../../../constants/colors";
import { Audio, staticFile } from "remotion";

export const EquationAlgorithmsSequence = {
  durationInFrames: 630,
  Component: (props: SeqProps) => (
    <DarkSlide name="Equation Algorithms" {...props}>
      <div className="flex flex-col items-center gap-16 text-[4rem] ">
        <p style={textNeonStyle(TEXT_SLIDE)}>Monte Carlo</p>
        <p style={textNeonStyle(TEXT_SLIDE)}>TD learning</p>
        <p style={textNeonStyle(TEXT_SLIDE)}>
          SARSA (State Action Reward State Action)
        </p>
        <p style={textNeonStyle(TEXT_SLIDE)}>Deep Q Network</p>
        <p style={textNeonStyle(TEXT_SLIDE)}>Q-learning</p>
      </div>
      <Anchor />
      <Audio src={staticFile("audio/algoriths.ogg")} />
    </DarkSlide>
  ),
};
