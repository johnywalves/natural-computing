import { MalleableProps } from "./MalleableProps";

export type MappedType = {
  name: string;
  model: MalleableProps["model"];
  mouse: (delta: number) => number;
  path: (delta: number) => number;
};
