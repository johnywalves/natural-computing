import { MalleableProps } from "./MalleableProps";

export type MappedType = {
  name: string;
  model: MalleableProps["model"];
  fnMouse: (delta: number) => number;
  fnPath: (delta: number) => number;
};
