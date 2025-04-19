import { Fragment } from "react/jsx-runtime";
import { NEUTRAL_MODEL } from "../../../../constants/models";
import { LINE_BORDER_HEIGHT } from "../../../../constants/sizes";
import Dot from "../Dot";
import Line from "../Line";
import BorderHorizontal from "../BorderHorizontal";
import { MappedType } from "../../../../types/MappedType";

const BorderLine = ({ line }: { line: Array<MappedType> }) => (
  <Line height={LINE_BORDER_HEIGHT}>
    <Dot model={NEUTRAL_MODEL} />

    {line.map(({ model }, y) => {
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
