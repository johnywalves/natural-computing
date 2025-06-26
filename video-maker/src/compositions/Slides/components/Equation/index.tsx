import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { textNeonStyle } from "../../../../utils/stylesFunctions";
import { TEXT_SLIDE } from "../../../../constants/colors";
import { ReactNode } from "react";
import { Audio, staticFile } from "remotion";

const WrapperLine = ({ children }: { children: ReactNode }) => (
  <p
    className="text-[2.5rem] text-center font-light flex flex-row justify-center items-end gap-4"
    style={textNeonStyle(TEXT_SLIDE)}
  >
    {children}
  </p>
);

const Strong = ({ children }: { children: ReactNode }) => (
  <strong className="text-[4rem]">{children}</strong>
);

export const EquationSequence = {
  durationInFrames: 2325,
  Component: (props: SeqProps) => (
    <DarkSlide name="Equation" {...props}>
      <div className="flex flex-col gap-2">
        <p
          className="text-[6rem] text-center mb-16"
          style={textNeonStyle(TEXT_SLIDE)}
        >
          Q'<sub>(s,a)</sub> = Q<sub>(s,a)</sub> + &alpha; * (R + &gamma; * max
          [Q<sub>(s',a)</sub>])
        </p>

        <WrapperLine>
          <Strong>
            Q'<sub>(s,a)</sub>
          </Strong>{" "}
          Novo valor do estado, ação
        </WrapperLine>

        <WrapperLine>
          <Strong>
            Q<sub>(s,a)</sub>
          </Strong>{" "}
          Novo atual do estado, ação
        </WrapperLine>

        <WrapperLine>
          <Strong>&alpha;</Strong> taxa de aprendizado
        </WrapperLine>

        <WrapperLine>
          <Strong>R</Strong> Recompensa
        </WrapperLine>

        <WrapperLine>
          <Strong>&gamma;</Strong> taxa de desconto
        </WrapperLine>

        <WrapperLine>
          <Strong>
            max [Q<sub>(s',a)</sub>]
          </Strong>{" "}
          maior valor de Q entre as ações possíveis
        </WrapperLine>
      </div>
      <Anchor />
      <Audio src={staticFile("audio/equation.ogg")} />
    </DarkSlide>
  ),
};
