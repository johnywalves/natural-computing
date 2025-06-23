import { SeqProps } from "../../../../compositions/Slides/types";

export type TypeStepRL =
  | "environment"
  | "action"
  | "state"
  | "reward"
  | "agent";

export type LoopProps = {
  step?: TypeStepRL;
} & SeqProps;
