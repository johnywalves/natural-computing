import { Anchor } from "../../../../components/Anchor";
import { TRAINING_MAZE } from "../../../../utils/maze";
import Maze from "../../../../components/Maze";
import { Img, staticFile } from "remotion";
import { Arrow } from "../../../../components/Arrow";
import { TypeStepRL } from "./type";
import { CSSProperties, ReactNode } from "react";

const Label = ({ children }: { children: ReactNode }) => (
  <p
    className="bg-white absolute text-4xl font-bold px-16 py-5"
    style={{ left: "50%", transform: "translate(-50%, -50%)" }}
  >
    {children}
  </p>
);

export const getLoopSequence = (stepRL?: TypeStepRL) => {
  const getOpacity = (currentStep: TypeStepRL) =>
    ({
      opacity: !stepRL || stepRL === currentStep ? 1 : 0.25,
      filter: stepRL === currentStep ? "drop-shadow(0 0 32px #ffffff80)" : "",
    }) as CSSProperties;

  return (
    <>
      <div
        className="relative w-[38rem] h-[38rem]"
        style={getOpacity("environment")}
      >
        <Label>Ambiente</Label>
        <Maze data={TRAINING_MAZE} path={[]} />
      </div>

      <div className="flex flex-col gap-[3rem]">
        <Arrow
          height="12rem"
          width="24rem"
          text="Ação"
          style={getOpacity("action")}
        />
        <Arrow
          height="12rem"
          width="24rem"
          text="Estado"
          style={getOpacity("state")}
          isRight
        />
        <Arrow
          height="12rem"
          width="24rem"
          text="Recompensa"
          isRight
          style={getOpacity("reward")}
        />
      </div>

      <div className="relative w-[38rem] h-[38rem]" style={getOpacity("agent")}>
        <Label>Agente</Label>
        <Img src={staticFile("renata_square.jpg")} alt="" className="w-full" />
      </div>

      <Anchor />
    </>
  );
};
