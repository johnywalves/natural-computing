import { DarkSlide } from "../../../../components/Slide";
import { Anchor } from "../../../../components/Anchor";
import { SeqProps } from "../../../../compositions/Slides/types";

export const QTableSequence = {
  durationInFrames: 320,
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
            <p className="p-4 w-full text-right">-1.12157351</p>
            <p className="p-4 w-full text-right">-2.00576384</p>
            <p className="p-4 w-full text-right">-1.11643026</p>
            <p className="p-4 w-full text-right">-1.09289668</p>
          </div>
          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(0, 1)</p>
            <p className="p-4 w-full text-right">-1.77986068</p>
            <p className="p-4 w-full text-right">-0.91897116</p>
            <p className="p-4 w-full text-right">-0.78331622</p>
            <p className="p-4 w-full text-right">-1.77422917</p>
          </div>
          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(0, 2)</p>
            <p className="p-4 w-full text-right">-1.77614592</p>
            <p className="p-4 w-full text-right">-1.76662435</p>
            <p className="p-4 w-full text-right">-0.88577083</p>
            <p className="p-4 w-full text-right">-0.79541802</p>
          </div>

          <p className="py-8 text-5xl w-full text-center text-[#eeeeee]">...</p>

          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(15, 14)</p>
            <p className="p-4 w-full text-right">-1.77614592</p>
            <p className="p-4 w-full text-right">-1.76662435</p>
            <p className="p-4 w-full text-right">-0.88577083 </p>
            <p className="p-4 w-full text-right">-0.79541802</p>
          </div>
          <div className="grid grid-cols-5 text-[#eeeeee]">
            <p className="p-4 w-full text-center">(15, 15)</p>
            <p className="p-4 w-full text-right">-1.12517253</p>
            <p className="p-4 w-full text-right">-2.02145288</p>
            <p className="p-4 w-full text-right">-2.01042901</p>
            <p className="p-4 w-full text-right">-1.11500622</p>
          </div>
        </div>
        <Anchor />
      </DarkSlide>
    );
  },
};
