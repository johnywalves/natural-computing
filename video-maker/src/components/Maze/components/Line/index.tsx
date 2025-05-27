import { CSSProperties, ReactNode } from "react";
import { LINE_WIDTH } from "../../../../constants/sizes";

type LineProps = {
  style: CSSProperties;
  children: ReactNode;
};

const Line = ({ style, children }: LineProps) => (
  <div className="flex row" style={{ ...LINE_WIDTH, ...style }}>
    {children}
  </div>
);

export default Line;
