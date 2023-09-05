export const BarTotalMoneyLayer = (props: any) => {
  const labelOffset = 10;
  const labelFontSize = 12;

  if (props.bars.length === 0) return null;

  // compute totals for each index/bar
  const totals: any = {};
  const bandwidth = props.bars[0].width;

  props.bars.forEach((bar: any) => {
    const indexValue = bar.data.indexValue;
    if (!(indexValue in totals)) {
      totals[indexValue] = 0;
    }
    if (!bar.data.hidden) {
      totals[indexValue] += bar.data.value;
    }
  });

  // place text elements above the bars
  const labels = Object.keys(totals).map((indexValue) => {
    const x = props.xScale(indexValue) + bandwidth / 2;
    const y = props.yScale(totals[indexValue]) - labelOffset;

    return (
      <text
        key={"total." + indexValue}
        x={x}
        y={y}
        textAnchor={"middle"}
        fontWeight={"bold"}
        fontSize={labelFontSize}
      >
        R${" "}
        {totals[indexValue].toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </text>
    );
  });

  return <>{labels}</>;
};

export const BarTotalLayer = (props: any) => {
  const labelOffset = 10;
  const labelFontSize = 12;

  if (props.bars.length === 0) return null;

  // compute totals for each index/bar
  const totals: any = {};
  const bandwidth = props.bars[0].width;

  props.bars.forEach((bar: any) => {
    const indexValue = bar.data.indexValue;
    if (!(indexValue in totals)) {
      totals[indexValue] = 0;
    }
    if (!bar.data.hidden) {
      totals[indexValue] += bar.data.value;
    }
  });

  // place text elements above the bars
  const labels = Object.keys(totals).map((indexValue) => {
    const x = props.xScale(indexValue) + bandwidth / 2;
    const y = props.yScale(totals[indexValue]) - labelOffset;

    return (
      <text
        key={"total." + indexValue}
        x={x}
        y={y}
        textAnchor={"middle"}
        fontWeight={"bold"}
        fontSize={labelFontSize}
      >
        {totals[indexValue]}
      </text>
    );
  });

  return <>{labels}</>;
};
