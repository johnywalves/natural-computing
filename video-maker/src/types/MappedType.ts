import { MalleableProps } from "./MalleableProps";

export type MappedType = {
  pos: { x: number; y: number };
  name: string;
  model: MalleableProps["curModel"];
  fnMouse: (delta: number) => number;
  fnPath: (delta: number) => number;
};
