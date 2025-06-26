import { Anchor } from "../../../../components/Anchor";
import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";

export const ReferencesSequence = {
  durationInFrames: 320,
  Component: (props: SeqProps) => {
    return (
      <DarkSlide name="References" {...props}>
        <div className="text-[#eeeeee] flex flex-col text-5xl gap-18 w-full">
          <p className="px-34">
            https://www.learndatasci.com/tutorials/reinforcement-q-learning-scratch-python-openai-gym/
          </p>
          <p className="px-34">
            https://fei.edu.br/~rbianchi/publications/bianchi-ctd2005.pdf
          </p>
          <p className="px-34">
            https://www.scielo.br/j/ca/a/3DBTYQnRP5vkXswNZGd6SVC/?format=pdf&lang=pt
          </p>
        </div>
        <Anchor />
      </DarkSlide>
    );
  },
};
