import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Anchor } from "../../../../components/Anchor";
import { textNeonStyle } from "../../../../utils/stylesFunctions";
import { TEXT_SLIDE } from "../../../../constants/colors";
import { BlockRender } from "../Blocks";
import { Audio, staticFile } from "remotion";

export const ProcessSequence = {
  durationInFrames: 1250,
  Component: (props: SeqProps) => (
    <DarkSlide name="Process" {...props}>
      <div className="flex flex-col gap-16 justify-center items-center">
        <div className="text-4xl w-full">
          <div className="grid grid-cols-5 border-2 bg-[#eeeeee]">
            <p className="p-4 w-full text-center">Estado</p>
            <p className="p-4 w-full text-right">Norte</p>
            <p className="p-4 w-full text-right">Sul</p>
            <p className="p-4 w-full text-right">Leste</p>
            <p className="p-4 w-full text-right">Oeste</p>
          </div>
          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(4,12)</p>
            <p className="p-4 w-full text-right">-1.12157351</p>
            <p className="p-4 w-full text-right">-2.00576384</p>
            <p className="p-4 w-full text-right">-1.11643026</p>
            <p className="p-4 w-full text-right">-1.09289668</p>
          </div>
        </div>

        <p
          className="text-[5rem] text-center"
          style={textNeonStyle(TEXT_SLIDE)}
        >
          Máximo = Oeste
        </p>

        <BlockRender model={12} />

        <p
          className="text-[5rem] text-center"
          style={textNeonStyle(TEXT_SLIDE)}
        >
          Recompensa = -1
        </p>
      </div>
      <Anchor />
      <Audio src={staticFile("audio/process.ogg")} />
    </DarkSlide>
  ),
};
