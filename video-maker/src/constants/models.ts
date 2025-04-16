export const BINARY_MODEL_BORDER: Record<number, Array<0 | 1>> = {
  0x00: [0, 0, 0, 1],
  0x01: [1, 0, 0, 0],
  0x02: [0, 1, 0, 0],
  0x03: [0, 0, 1, 0],
  0x04: [0, 0, 1, 1],
  0x05: [0, 1, 1, 0],
  0x06: [1, 1, 0, 0],
  0x07: [1, 0, 0, 1],
  0x08: [0, 1, 0, 1],
  0x09: [1, 0, 1, 0],
  0x0a: [0, 1, 1, 1],
  0x0b: [1, 1, 1, 0],
  0x0c: [1, 1, 0, 1],
  0x0d: [1, 0, 1, 1],
  0x0e: [0, 0, 0, 0],
  0x0f: [1, 1, 1, 1],
};

export const CLASSNAME_MODEL_BORDER: Record<number, string> = Object.keys(
  BINARY_MODEL_BORDER,
).map((item) => {
  const binaries = BINARY_MODEL_BORDER[Number(item)];

  const top = binaries[0] ? "border-t-amber-700" : "border-t-transparent";
  const right = binaries[1] ? "border-r-amber-700" : "border-r-transparent";
  const bottom = binaries[2] ? "border-b-amber-700" : "border-b-transparent";
  const left = binaries[3] ? "border-l-amber-700" : "border-l-transparent";

  return `${top} ${right} ${bottom} ${left}`;
});
