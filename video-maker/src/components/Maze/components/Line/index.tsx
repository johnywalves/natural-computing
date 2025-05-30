import { CSSProperties, HTMLProps } from "react";
import { LINE_WIDTH } from "../../../../constants/sizes";

type LineProps = {
  style: CSSProperties;
} & HTMLProps<HTMLDivElement>;

const Line = ({ style, children, ...rest }: LineProps) => (
  <div {...rest} className="flex row" style={{ ...LINE_WIDTH, ...style }}>
    {children}
  </div>
);

export default Line;
