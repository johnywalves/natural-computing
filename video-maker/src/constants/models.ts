import { MalleableProps } from "../types/MalleableProps";
import { MappedType } from "../types/MappedType";

// Cima, Direita, Baixo, Esquerda
export const BINARY_MODEL_BORDER: Record<number, Array<0 | 1>> = {
  0x00: [0, 0, 0, 0],
  0x01: [1, 0, 0, 0],
  0x02: [0, 1, 0, 0],
  0x03: [1, 1, 0, 0],
  0x04: [0, 0, 1, 1],
  0x05: [1, 0, 1, 0],
  0x06: [0, 1, 1, 0],
  0x07: [1, 1, 1, 0],
  0x08: [1, 0, 0, 0],
  0x09: [1, 0, 0, 1],
  0x0a: [0, 1, 0, 1],
  0x0b: [1, 1, 0, 1],
  0x0c: [0, 0, 1, 1],
  0x0d: [1, 0, 1, 1],
  0x0e: [0, 1, 1, 1],
  0x0f: [1, 1, 1, 1],
};

export const NEUTRAL_MODEL = 15 as MalleableProps["curModel"];

export const NEUTRAL_LINE_MODEL: Array<MappedType> = Array.from({
  length: 16,
}).map(() => ({
  pos: { x: 0, y: 0 },
  name: "",
  model: NEUTRAL_MODEL,
  fnMouse: () => 0,
  fnPath: () => 0,
}));
