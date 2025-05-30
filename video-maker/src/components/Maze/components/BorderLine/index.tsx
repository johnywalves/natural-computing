import { Fragment } from "react/jsx-runtime";
import { NEUTRAL_MODEL } from "../../../../constants/models";
import { LINE_BORDER_HEIGHT } from "../../../../constants/sizes";
import Dot from "../Dot";
import Line from "../Line";
import BorderHorizontal from "../BorderHorizontal";
import { MappedType } from "../../../../types/MappedType";
import { HTMLProps } from "react";

const BorderLine = ({
  id,
  line,
  ...rest
}: { line: Array<MappedType> } & HTMLProps<HTMLDivElement>) => (
  <Line {...rest} style={LINE_BORDER_HEIGHT}>
    <Dot curModel={NEUTRAL_MODEL} nextModel={NEUTRAL_MODEL} />

    {line.map(({ model }, idx) => {
      const nextIdx = idx + 1;
      const inRange = line.length > nextIdx;
      const nextModel = inRange ? line[nextIdx].model : NEUTRAL_MODEL;
      const identify = `${id}-dash-${idx}`;

      return (
        <Fragment key={"block-" + idx}>
          <BorderHorizontal
            key={identify}
            id={identify}
            curModel={model}
            nextModel={nextModel}
          />
          <Dot curModel={model} nextModel={nextModel} />
        </Fragment>
      );
    })}
  </Line>
);

export default BorderLine;
