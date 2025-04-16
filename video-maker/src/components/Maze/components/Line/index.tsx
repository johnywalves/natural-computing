import { ReactNode } from "react";
import { LINE_WIDTH } from "../../../../constants/sizes";

type LineProps = {
  height: string;
  children: ReactNode;
};

const Line = ({ height, children }: LineProps) => (
  <div className={`flex row ${LINE_WIDTH} ${height}`}>{children}</div>
);

export default Line;
