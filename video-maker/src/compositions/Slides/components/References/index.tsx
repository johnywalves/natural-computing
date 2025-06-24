import { DarkSlide } from "../../../../components/Slide";
import { SeqProps } from "../../../../compositions/Slides/types";

export const ReferencesSequence = {
  durationInFrames: 320,
  Component: (props: SeqProps) => {
    return (
      <DarkSlide name="References" {...props}>
        <div className="text-[#eeeeee]">
          <p>
            https://www.learndatasci.com/tutorials/reinforcement-q-learning-scratch-python-openai-gym/
          </p>
          <p>https://fei.edu.br/~rbianchi/publications/bianchi-ctd2005.pdf</p>
          <p>
            https://www.scielo.br/j/ca/a/3DBTYQnRP5vkXswNZGd6SVC/?format=pdf&lang=pt
          </p>
        </div>
      </DarkSlide>
    );
  },
};
