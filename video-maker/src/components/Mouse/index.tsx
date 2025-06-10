import { CSSProperties } from "react";

const Mouse = ({
  opacity = 0,
  className,
  style,
}: {
  opacity?: number;
  className?: string;
  style?: CSSProperties;
}) => (
  <div
    className={`w-[50%] h-[50%] border-2 border-[#f39600] bg-[#f39600] rounded-[50%] ${className ?? ""}`}
    style={{
      ...style,
      opacity,
      boxShadow:
        "0 0 4px #f39600, inset 0 0 4px #f39600, 0 0 8px #f39600, inset 0 0 8px #f39600",
    }}
  />
);

export default Mouse;
