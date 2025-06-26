import { DarkSlide } from "../../../../components/Slide";
import { Anchor } from "../../../../components/Anchor";
import { SeqProps } from "../../../../compositions/Slides/types";
import { Audio, staticFile } from "remotion";

export const QTableZeroSequence = {
  durationInFrames: 700,
  Component: (props: SeqProps) => {
    return (
      <DarkSlide name="Q-Table" {...props}>
        <div className="text-4xl w-[75%]">
          <div className="grid border-2 bg-[#eeeeee] grid-cols-5">
            <p className="p-4 w-full text-center">Estado</p>
            <p className="p-4 w-full text-right">Norte</p>
            <p className="p-4 w-full text-right">Sul</p>
            <p className="p-4 w-full text-right">Leste</p>
            <p className="p-4 w-full text-right">Oeste</p>
          </div>
          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(0,0)</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
          </div>
          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(0, 1)</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
          </div>
          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(0, 2)</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
          </div>

          <p className="py-8 text-5xl w-full text-center text-[#eeeeee]">...</p>

          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(15, 14)</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
          </div>
          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(15, 15)</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
            <p className="p-4 w-full text-right">0</p>
          </div>
        </div>
        <Anchor />
        <Audio src={staticFile("audio/qtablezero.ogg")} />
      </DarkSlide>
    );
  },
};
