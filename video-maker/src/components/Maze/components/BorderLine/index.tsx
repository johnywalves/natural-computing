import { Fragment } from "react/jsx-runtime";
import { NEUTRAL_MODEL } from "../../../../constants/models";
import { LINE_BORDER_HEIGHT } from "../../../../constants/sizes";
import Dot from "../Dot";
import Line from "../Line";
import BorderHorizontal from "../BorderHorizontal";
import { MalleableProps } from "../../../../types/MalleableProps";

const BorderLine = ({ line }: { line: Array<number> }) => (
  <Line height={LINE_BORDER_HEIGHT}>
    <Dot model={NEUTRAL_MODEL} />

    {line.map((item, y) => {
      const model = item as MalleableProps["model"];
      return (
        <Fragment key={"block-" + y}>
          <BorderHorizontal key={"line-" + y} model={model} />
          <Dot model={model} />
        </Fragment>
      );
    })}
  </Line>
);

export default BorderLine;
