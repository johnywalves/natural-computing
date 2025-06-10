import { CSSProperties } from "react";

const Neon = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <div
    className={`${className} w-full h-full bg-[#e0138c]`}
    style={{
      boxShadow: "0 0 16px #e0138c80, 0 0 32px #e0138c80, 0 0 64px #e0138c80",
      ...style,
    }}
  />
);

export default Neon;
